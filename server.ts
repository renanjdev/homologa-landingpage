import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import firebaseConfig from './firebase-applet-config.json';

dotenv.config();

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: firebaseConfig.projectId,
  });
}

const db = admin.firestore();
const resend = new Resend(process.env.RESEND_API_KEY || '');

// Helper to generate referral code
function generateReferralCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV });
  });

  // API Route for Waitlist
  app.post("/api/waitlist", async (req, res) => {
    const { whatsapp } = req.body;

    if (!whatsapp) {
      return res.status(400).json({ error: "WhatsApp is required" });
    }

    try {
      // Here you could integrate with a WhatsApp API (like Twilio or a custom provider)
      // For now, we just acknowledge the receipt on the server side.
      console.log(`New waitlist entry: ${whatsapp}`);
      
      res.json({ success: true });
    } catch (err) {
      console.error('Server Error:', err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.all("/api/waitlist", (req, res) => {
    res.status(405).json({ error: "Method not allowed" });
  });

  // API Route for WhatsApp Notifications
  app.post("/api/notify", async (req, res) => {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: "Recipient and message are required" });
    }

    try {
      // MOCK WHATSAPP SENDING
      // In a real scenario, you would use an API like Twilio, Meta, or a local gateway.
      console.log(`[WHATSAPP NOTIFICATION] To: ${to} | Message: ${message}`);
      
      // Example integration (commented out):
      /*
      await fetch('https://api.whatsapp.com/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: to,
          type: "text",
          text: { body: message }
        })
      });
      */

      res.json({ success: true, message: "Notification sent (mocked)" });
    } catch (err) {
      console.error('Notification Error:', err);
      res.status(500).json({ error: "Failed to send notification" });
    }
  });

  app.all("/api/notify", (req, res) => {
    res.status(405).json({ error: "Method not allowed" });
  });

  // API Route for Email Confirmation (Now Waitlist Logic)
  app.post("/api/send-confirmation", async (req, res) => {
    const { email, whatsapp, utm_source, utm_medium, utm_campaign, referrer: refCode } = req.body;
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    
    if (!cleanEmail) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    try {
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

      // 2. Security: Check IP limits (simple check)
      const recentIpCheck = await waitlistRef.where('ip', '==', ip).where('createdAt', '>', admin.firestore.Timestamp.fromMillis(Date.now() - 3600000)).get();
      if (recentIpCheck.size >= 5) {
        return res.status(429).json({ error: "Too many registrations from this IP. Please try again later." });
      }

      // 3. Get current total for rank
      const statsDoc = await statsRef.get();
      let currentTotal = 87; // Starting base
      if (statsDoc.exists) {
        currentTotal = statsDoc.data()?.waitlistCount || 87;
      }
      const newRank = currentTotal + 1;

      // 4. Generate unique referral code
      let referralCode = generateReferralCode();
      // Ensure uniqueness (simple check)
      const codeCheck = await waitlistRef.where('referralCode', '==', referralCode).get();
      if (!codeCheck.empty) {
        referralCode = generateReferralCode(7); // Try longer if collision
      }

      // 5. Handle Referral
      let referredBy = null;
      if (refCode) {
        const referrerQuery = await waitlistRef.where('referralCode', '==', refCode).get();
        if (!referrerQuery.empty) {
          const referrerDoc = referrerQuery.docs[0];
          referredBy = refCode;
          
          // Update referrer: increment count and improve rank
          await referrerDoc.ref.update({
            referralCount: admin.firestore.FieldValue.increment(1),
            rank: admin.firestore.FieldValue.increment(-10) // Move up 10 positions
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
        const resendClient = new Resend(apiKey);
        const referralLink = `https://homologaplus.com.br/?ref=${referralCode}`;
        
        await resendClient.emails.send({
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
                      <p style="color: #64748B; font-size: 15px; line-height: 1.6; text-align: center; margin: 0;">
                        Estamos preparando a plataforma que vai simplificar a homologação de usinas fotovoltaicas nas concessionárias.<br><br>
                        Em breve enviaremos novidades do lançamento.
                      </p>
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

      res.json({ 
        success: true, 
        data: {
          rank: newRank,
          referralCode,
          referralCount: 0
        }
      });
    } catch (err) {
      console.error('Waitlist Error:', err);
      res.status(500).json({ error: "Failed to process waitlist entry" });
    }
  });

  // Handle other methods for /api/send-confirmation
  app.all("/api/send-confirmation", (req, res) => {
    res.status(405).json({ error: "Method not allowed" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode...");
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
