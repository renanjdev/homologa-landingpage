import { Resend } from 'resend';
import * as admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Helper to load firebase config
const getConfig = () => {
  const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
};

const firebaseConfig = getConfig();

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: firebaseConfig.projectId,
  });
}

const db = admin.firestore();

// Helper to generate referral code
function generateReferralCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default async function handler(req: any, res: any) {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, whatsapp, utm_source, utm_medium, utm_campaign, referrer: refCode } = req.body || {};
    
    // Vercel specific IP detection
    const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown';

    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    
    if (!cleanEmail) {
      return res.status(400).json({ error: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const waitlistRef = db.collection('waitlist');
    const statsRef = db.collection('stats').doc('global');
    
    // 1. Check if email already exists
    const existingLead = await waitlistRef.doc(cleanEmail).get();
    
    if (existingLead.exists) {
      const data = existingLead.data();
      return res.json({ 
        success: true, 
        alreadyExists: true,
        data: {
          rank: data?.rank,
          referralCode: data?.referralCode,
          referralCount: data?.referralCount
        }
      });
    }

    // 2. Security: Check IP limits
    const recentIpCheck = await waitlistRef.where('ip', '==', ip).where('createdAt', '>', admin.firestore.Timestamp.fromMillis(Date.now() - 3600000)).get();
    if (recentIpCheck.size >= 5) {
      return res.status(429).json({ error: "Too many registrations from this IP. Please try again later." });
    }

    // 3. Get current total for rank
    const statsDoc = await statsRef.get();
    let currentTotal = 87;
    if (statsDoc.exists) {
      currentTotal = statsDoc.data()?.waitlistCount || 87;
    }
    const newRank = currentTotal + 1;

    // 4. Generate unique referral code
    let referralCode = generateReferralCode();
    const codeCheck = await waitlistRef.where('referralCode', '==', referralCode).get();
    if (!codeCheck.empty) {
      referralCode = generateReferralCode(7);
    }

    // 5. Handle Referral
    let referredBy = null;
    if (refCode) {
      const referrerQuery = await waitlistRef.where('referralCode', '==', refCode).get();
      if (!referrerQuery.empty) {
        const referrerDoc = referrerQuery.docs[0];
        referredBy = refCode;
        
        await referrerDoc.ref.update({
          referralCount: admin.firestore.FieldValue.increment(1),
          rank: admin.firestore.FieldValue.increment(-10)
        });
      }
    }

    // 6. Save new lead
    const newLead = {
      email: cleanEmail,
      whatsapp: whatsapp || '',
      rank: newRank,
      referralCode,
      referredBy,
      referralCount: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      ip,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null
    };

    await waitlistRef.doc(cleanEmail).set(newLead);

    // 7. Update global stats
    if (statsDoc.exists) {
      await statsRef.update({ waitlistCount: admin.firestore.FieldValue.increment(1) });
    } else {
      await statsRef.set({ waitlistCount: newRank });
    }

    // 8. Send confirmation email
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      const referralLink = `https://homologaplus.com.br/?ref=${referralCode}`;
      
      await resend.emails.send({
        from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
        to: [cleanEmail],
        subject: 'Você entrou na lista do HOMOLOGA Plus 🚀',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Bem-vindo ao HOMOLOGA Plus</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <tr>
                  <td align="center" style="padding: 40px 0; background-color: #1E293B;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="background-color: #F27D26; padding: 12px; border-radius: 14px;">
                          <img src="https://cdn-icons-png.flaticon.com/512/979/979585.png" alt="Logo" width="40" height="40" style="display: block;">
                        </td>
                        <td style="padding-left: 15px;">
                          <span style="font-size: 24px; font-weight: bold; color: #ffffff; letter-spacing: -0.5px;">HOMOLOGA <span style="color: #F27D26;">Plus</span></span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px; text-align: center;">
                    <h1 style="color: #1E293B; font-size: 28px; margin: 0 0 20px 0; font-weight: 800;">Acesso Confirmado! 🚀</h1>
                    <p style="color: #64748B; font-size: 16px; line-height: 1.6; margin: 0;">
                      Olá!<br><br>
                      Seu acesso antecipado foi confirmado. Você agora faz parte do grupo de projetistas que terão prioridade no lançamento da plataforma <strong>HOMOLOGA Plus</strong>.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px;">
                    <div style="background-color: #F8FAFC; padding: 30px; border-radius: 20px; border: 2px dashed #E2E8F0; text-align: center;">
                      <p style="margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8; font-weight: 700;">SUA POSIÇÃO NA FILA</p>
                      <p style="margin: 10px 0 0 0; font-size: 48px; font-weight: 900; color: #F27D26;">#${newRank}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px;">
                    <div style="background-color: #FFF7ED; border-left: 4px solid #F27D26; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 25px;">
                      <h4 style="color: #C2410C; margin: 0 0 10px 0; font-size: 16px;">💡 Quer subir na fila?</h4>
                      <p style="color: #C2410C; font-size: 14px; margin: 0; line-height: 1.5;">
                        Compartilhe seu link exclusivo com outros projetistas solares. Cada indicação válida faz você subir posições.
                      </p>
                      <p style="margin-top: 15px; font-family: monospace; background: #fff; padding: 10px; border-radius: 8px; border: 1px solid #FED7AA; color: #F27D26; font-weight: bold; text-align: center;">
                        ${referralLink}
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; background-color: #F1F5F9; text-align: center; border-radius: 0 0 16px 16px;">
                    <p style="margin: 0 0 10px 0; color: #1E293B; font-size: 14px; font-weight: 700;">Equipe HOMOLOGA Plus</p>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
    }

    return res.status(200).json({ 
      success: true, 
      data: {
        rank: newRank,
        referralCode,
        referralCount: 0
      }
    });
  } catch (err: any) {
    console.error('Global API Exception:', err);
    return res.status(500).json({ 
      error: "Internal Server Error", 
      message: err.message
    });
  }
}
