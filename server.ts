import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { getEmailHtml } from './api/email-template';

dotenv.config();

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

  // API Route for Email Confirmation
  app.post("/api/send-confirmation", async (req, res) => {
    const { email, whatsapp, rank, utm_source, utm_medium, utm_campaign, referrer } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    
    console.log("[Server] Novo lead:", {
      email: cleanEmail,
      whatsapp,
      rank,
      ip,
      utm: { utm_source, utm_medium, utm_campaign },
      timestamp: new Date().toISOString()
    });

    if (!cleanEmail) {
      return res.status(400).json({ error: "Email é obrigatório" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: "Formato de email inválido" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    console.log('[Server] Verificando API Key:', { 
      exists: !!apiKey, 
      length: apiKey?.length,
      nodeEnv: process.env.NODE_ENV 
    });

    if (!apiKey) {
      console.error('[Server] Erro: RESEND_API_KEY não configurada');
      return res.status(500).json({ error: "Serviço de email não configurado" });
    }

    try {
      const resendClient = new Resend(apiKey);
      console.log('[Server] Resend inicializado');
      const displayRank = rank || '---';
      
      const { data, error } = await resendClient.emails.send({
        from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
        to: [cleanEmail],
        subject: 'Você entrou na lista do HOMOLOGA Plus 🚀',
        text: `Olá! Seu acesso antecipado foi confirmado. Você agora faz parte do grupo de projetistas que terão prioridade no lançamento da plataforma HOMOLOGA Plus. SUA POSIÇÃO NA FILA: #${displayRank}.`,
        html: getEmailHtml(displayRank),
      });

      if (error) {
        console.error('[Server] Erro no Resend:', error);
        return res.status(400).json({ error: "Falha ao enviar email", details: error });
      }

      res.json({ success: true, data });
    } catch (err: any) {
      console.error('[Server] Exceção no Email:', err);
      return res.status(500).json({ 
        error: "Erro interno ao enviar email", 
        message: err.message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
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
