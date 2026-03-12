import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY || '');

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

  // API Route for Email Confirmation
  app.post("/api/send-confirmation", async (req, res) => {
    const { email, whatsapp, rank } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: 'HOMOLOGA Plus <onboarding@resend.dev>',
        to: [email],
        subject: '🚀 Bem-vindo à lista de espera do HOMOLOGA Plus!',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
            <h1 style="color: #F27D26;">Você está na lista!</h1>
            <p>Olá,</p>
            <p>Ficamos muito felizes com seu interesse no <strong>HOMOLOGA Plus</strong>. Você acaba de garantir seu lugar na fila para a plataforma definitiva de gestão para projetistas solares.</p>
            
            <div style="background-color: #F8FAFC; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748B;">Sua posição atual</p>
              <p style="margin: 5px 0 0 0; font-size: 32px; font-weight: bold; color: #F27D26;">#${rank}</p>
            </div>

            <p><strong>Dica de Ouro:</strong> Quer subir na fila? Indique outros projetistas usando seu link exclusivo que você recebeu na página de confirmação.</p>
            
            <p>Em breve traremos mais novidades sobre o lançamento e o <strong>Plano Fundador</strong>.</p>
            
            <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 30px 0;" />
            <p style="font-size: 12px; color: #94A3B8;">Equipe HOMOLOGA Plus</p>
          </div>
        `,
      });

      if (error) {
        console.error('Resend Error:', error);
        return res.status(400).json({ error });
      }

      res.json({ success: true, data });
    } catch (err) {
      console.error('Email Error:', err);
      res.status(500).json({ error: "Failed to send email" });
    }
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
