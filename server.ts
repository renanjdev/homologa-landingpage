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
  app.use(express.urlencoded({ extended: true }));

  // Health check route
  app.get("/api/health", (req, res) => {
    console.log("Health check requested");
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

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing');
      return res.status(500).json({ error: "Email service not configured" });
    }

    try {
      const resendClient = new Resend(apiKey);
      
      const { data, error } = await resendClient.emails.send({
        from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
        to: ['contato@homologaplus.com.br'],
        subject: `Contato: ${subject || 'Nova mensagem'}`,
        text: `Nome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\n\nMensagem:\n${message}`,
        html: `
          <h3>Nova mensagem de contato</h3>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Assunto:</strong> ${subject}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (error) {
        console.error('Resend Error:', error);
        return res.status(400).json({ error });
      }

      res.json({ success: true, data });
    } catch (err) {
      console.error('Contact Exception:', err);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.all("/api/contact", (req, res) => {
    res.status(405).json({ error: "Method not allowed" });
  });

  // API Route for Email Confirmation
  app.post("/api/send-confirmation", async (req, res) => {
    const { email, whatsapp, rank, utm_source, utm_medium, utm_campaign, referrer } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    console.log("Novo lead:", {
      email: cleanEmail,
      whatsapp,
      rank,
      ip,
      utm_source,
      utm_medium,
      utm_campaign,
      referrer,
      created_at: new Date().toISOString()
    });

    if (!cleanEmail) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Basic email validation to prevent Resend validation errors
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing');
      return res.status(500).json({ error: "Email service not configured" });
    }

    try {
      const resendClient = new Resend(apiKey);
      const displayRank = rank || '---';
      
      const { data, error } = await resendClient.emails.send({
        from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
        to: [cleanEmail],
        subject: 'Você entrou na lista do HOMOLOGA Plus 🚀',
        text: `Olá! Seu acesso antecipado foi confirmado. Você agora faz parte do grupo de projetistas que terão prioridade no lançamento da plataforma HOMOLOGA Plus. SUA POSIÇÃO NA FILA: #${displayRank}. Os primeiros usuários terão acesso ao Plano Fundador com condições especiais. Quer subir na fila? Compartilhe seu link exclusivo com outros projetistas solares.`,
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
                <!-- Header with Logo -->
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
                
                <!-- Hero Section -->
                <tr>
                  <td style="padding: 40px 30px; text-align: center;">
                    <h1 style="color: #1E293B; font-size: 28px; margin: 0 0 20px 0; font-weight: 800;">Acesso Confirmado! 🚀</h1>
                    <p style="color: #64748B; font-size: 16px; line-height: 1.6; margin: 0;">
                      Olá!<br><br>
                      Seu acesso antecipado foi confirmado. Você agora faz parte do grupo de projetistas que terão prioridade no lançamento da plataforma <strong>HOMOLOGA Plus</strong>.
                    </p>
                  </td>
                </tr>

                <!-- Rank Card -->
                <tr>
                  <td style="padding: 0 30px;">
                    <div style="background-color: #F8FAFC; padding: 30px; border-radius: 20px; border: 2px dashed #E2E8F0; text-align: center;">
                      <p style="margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8; font-weight: 700;">SUA POSIÇÃO NA FILA</p>
                      <p style="margin: 10px 0 0 0; font-size: 48px; font-weight: 900; color: #F27D26;">#${displayRank}</p>
                    </div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <div style="margin-bottom: 25px; text-align: center;">
                      <p style="color: #1E293B; font-size: 15px; line-height: 1.5; margin: 0;">
                        Os primeiros usuários terão acesso ao <strong>Plano Fundador</strong> com condições especiais.
                      </p>
                    </div>
                    
                    <div style="background-color: #FFF7ED; border-left: 4px solid #F27D26; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 25px;">
                      <h4 style="color: #C2410C; margin: 0 0 10px 0; font-size: 16px;">💡 Quer subir na fila?</h4>
                      <p style="color: #C2410C; font-size: 14px; margin: 0; line-height: 1.5;">
                        Compartilhe seu link exclusivo com outros projetistas solares. Cada indicação válida faz você subir posições.
                      </p>
                    </div>

                    <p style="color: #64748B; font-size: 15px; line-height: 1.6; text-align: center; margin: 0;">
                      Estamos preparando a plataforma que vai simplificar a homologação de usinas fotovoltaicas nas concessionárias.<br><br>
                      Em breve enviaremos novidades do lançamento.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 30px; background-color: #F1F5F9; text-align: center; border-radius: 0 0 16px 16px;">
                    <p style="margin: 0 0 10px 0; color: #1E293B; font-size: 14px; font-weight: 700;">
                      Equipe HOMOLOGA Plus
                    </p>
                    <p style="margin: 0 0 20px 0; color: #94A3B8; font-size: 12px; line-height: 1.4;">
                      Ferramenta criada por quem trabalha diariamente com projetos e homologação solar.
                    </p>
                    <div style="display: inline-block; margin: 0 10px;">
                      <a href="https://homologaplus.com.br" style="color: #F27D26; text-decoration: none; font-size: 12px; font-weight: 600;">Website</a>
                    </div>
                    <div style="display: inline-block; margin: 0 10px;">
                      <a href="https://instagram.com/homologaplus" style="color: #F27D26; text-decoration: none; font-size: 12px; font-weight: 600;">Instagram</a>
                    </div>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });

      if (error) {
        console.error('Resend Validation/API Error:', JSON.stringify(error, null, 2));
        return res.status(400).json({ error });
      }

      res.json({ success: true, data });
    } catch (err) {
      console.error('Email Exception:', err);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Handle other methods for /api/send-confirmation
  app.all("/api/send-confirmation", (req, res) => {
    res.status(405).json({ error: "Method not allowed" });
  });

  // Catch-all for undefined API routes
  app.all("/api/*", (req, res) => {
    res.status(404).json({ 
      error: "API route not found", 
      path: req.path,
      method: req.method 
    });
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
