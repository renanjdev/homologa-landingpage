import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import fs from 'fs';

import crypto from "crypto";

dotenv.config();

// Helper to load config safely
const loadConfig = () => {
  try {
    const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
    if (!fs.existsSync(configPath)) {
      console.warn('firebase-applet-config.json not found');
      return null;
    }
    const content = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Failed to load firebase-applet-config.json:', err);
    return null;
  }
};

const firebaseConfig = loadConfig();

// Initialize Firebase Admin
let firebaseApp: App | null = null;
try {
  const apps = getApps();
  if (apps.length === 0) {
    // Support both AI Studio config and Vercel environment variables
    if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      console.log('Initializing Firebase Admin with Environment Variables...');
      firebaseApp = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID || firebaseConfig?.projectId,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
      });
    } else if (firebaseConfig && firebaseConfig.projectId) {
      console.log('Initializing Firebase Admin with firebase-applet-config.json...');
      firebaseApp = initializeApp({
        projectId: firebaseConfig.projectId,
      });
    } else {
      console.warn('No Firebase configuration found (env vars or config file). Database features will be disabled.');
    }
    if (firebaseApp) console.log('Firebase Admin initialized successfully');
  } else {
    firebaseApp = apps[0]!;
    console.log('Using existing Firebase Admin instance');
  }
} catch (err) {
  console.error('CRITICAL: Firebase Admin initialization failed:', err);
}

// Helper to get Firestore instance safely
const getDb = () => {
  if (!firebaseApp) {
    console.error('getDb called: firebaseApp is null');
    return null;
  }
  try {
    // Check if we have a specific database ID
    const dbId = firebaseConfig?.firestoreDatabaseId;
    return dbId ? getFirestore(firebaseApp, dbId) : getFirestore(firebaseApp);
  } catch (err) {
    console.error('Firestore instance retrieval failed:', err);
    return null;
  }
};

// Helper to get Resend instance safely
const getResend = () => {
  if (!process.env.RESEND_API_KEY) return null;
  try {
    return new Resend(process.env.RESEND_API_KEY);
  } catch (err) {
    console.error('Resend initialization failed:', err);
    return null;
  }
};

// Helper to generate referral code (Suggested: 4 bytes hex)
function generateReferralCode() {
  return crypto.randomBytes(4).toString("hex");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Global error handler for JSON parsing
  app.use((err: any, req: any, res: any, next: any) => {
    if (err instanceof SyntaxError && 'body' in err) {
      return res.status(400).json({ error: "Invalid JSON" });
    }
    next();
  });

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      mode: process.env.NODE_ENV,
      firebase: !!firebaseConfig && getApps().length > 0,
      resend: !!process.env.RESEND_API_KEY
    });
  });

  // API Route for Waitlist
  app.post("/api/waitlist", async (req, res) => {
    const { whatsapp } = req.body;

    if (!whatsapp) {
      return res.status(400).json({ error: "WhatsApp is required" });
    }

    try {
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
      console.log(`[WHATSAPP NOTIFICATION] To: ${to} | Message: ${message}`);
      res.json({ success: true, message: "Notification sent (mocked)" });
    } catch (err) {
      console.error('Notification Error:', err);
      res.status(500).json({ error: "Failed to send notification" });
    }
  });

  app.all("/api/notify", (req, res) => {
    res.status(405).json({ error: "Method not allowed" });
  });

  // API Route for Join Waitlist (Suggested)
  app.post("/api/join-waitlist", async (req, res) => {
    const { email, whatsapp, ref, utm_source, utm_medium, utm_campaign } = req.body;
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    
    if (!cleanEmail) {
      return res.status(400).json({ error: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const db = getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not initialized" });
    }

    try {
      const waitlistRef = db.collection('waitlist');
      
      // 1. Check if email already exists
      const existing = await waitlistRef.where("email", "==", cleanEmail).limit(1).get();
      
      if (!existing.empty) {
        const data = existing.docs[0].data();
        return res.json({ 
          success: true, 
          rank: data.rank,
          referralCode: data.referralCode,
          referralCount: data.referralCount || 0
        });
      }

      // 2. Security: Check IP limits
      const recentIpCheck = await waitlistRef.where('ip', '==', ip).where('createdAt', '>', Timestamp.fromMillis(Date.now() - 3600000)).get();
      if (recentIpCheck.size >= 5) {
        return res.status(429).json({ error: "Too many registrations from this IP. Please try again later." });
      }

      // 3. Calculate Rank (totalUsers + 1)
      const totalUsers = await waitlistRef.count().get();
      const rank = totalUsers.data().count + 1;

      // 4. Generate unique referral code
      const referralCode = generateReferralCode();

      // 5. Handle Referral
      let referredBy = null;
      if (ref) {
        const refQuery = await waitlistRef.where("referralCode", "==", ref).limit(1).get();
        if (!refQuery.empty) {
          const refDoc = refQuery.docs[0];
          referredBy = refDoc.id;
          
          await refDoc.ref.update({
            referralCount: FieldValue.increment(1),
            rank: FieldValue.increment(-1) // Move up 1 position per referral
          });
        }
      }

      // 6. Save new lead
      const newUser = {
        email: cleanEmail,
        whatsapp: whatsapp || null,
        referralCode,
        referredBy,
        referralCount: 0,
        rank,
        createdAt: FieldValue.serverTimestamp(),
        ip,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null
      };

      await waitlistRef.add(newUser);

      // 7. Send confirmation email
      const resend = getResend();
      const referralLink = `https://homologaplus.com.br/?ref=${referralCode}`;

      if (resend) {
        try {
          await resend.emails.send({
            from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
            to: [cleanEmail],
            subject: 'Você entrou na lista do HOMOLOGA Plus 🚀',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #1E293B;">Bem-vindo ao HOMOLOGA Plus</h2>
                <p>Seu acesso antecipado foi confirmado. Você agora faz parte do grupo de projetistas que terão prioridade no lançamento.</p>

                <div style="background: #F8FAFC; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
                  <h3 style="margin: 0; color: #64748B; font-size: 14px; text-transform: uppercase;">Sua posição na fila</h3>
                  <h1 style="margin: 10px 0; color: #F27D26; font-size: 48px;">#${rank}</h1>
                </div>

                <p><strong>Quer subir na fila?</strong></p>
                <p>Compartilhe seu link exclusivo com outros projetistas. Cada indicação válida faz você subir posições.</p>

                <div style="background: #FFF7ED; padding: 15px; border-radius: 8px; border: 1px solid #FED7AA; text-align: center; font-family: monospace; font-weight: bold; color: #F27D26;">
                  <a href="${referralLink}" style="color: #F27D26; text-decoration: none;">${referralLink}</a>
                </div>

                <p style="font-size: 12px; color: #94A3B8; margin-top: 30px; text-align: center;">
                  Equipe HOMOLOGA Plus
                </p>
              </div>
            `,
          });
        } catch (emailErr) {
          console.error('Failed to send email:', emailErr);
        }
      }

      return res.json({
        success: true,
        rank,
        referralCode,
        referralLink,
      });
    } catch (err) {
      console.error('Waitlist Error:', err);
      res.status(500).json({ error: "Failed to process waitlist entry" });
    }
  });

  app.all("/api/join-waitlist", (req, res) => {
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
    
    // Explicitly serve index.html for SPA routing in dev
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
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

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
