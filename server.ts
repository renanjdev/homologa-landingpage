import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { createClient } from "@supabase/supabase-js";
import rateLimit from "express-rate-limit";

dotenv.config();

let supabaseClient: any = null;

function getSupabase() {
  if (!supabaseClient) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;
    if (!url || !key) {
      // Don't throw here to avoid crashing server on startup
      // Instead, we'll check inside the routes
      return null;
    }
    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_1234567890');

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Security: Rate Limiting
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, // 5 requests per 15 minutes
    message: { error: "Muitas tentativas de login. Tente novamente mais tarde." }
  });

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // 100 requests per 15 minutes for normal API routes
    message: { error: "Muitas requisições. Tente novamente mais tarde." }
  });

  app.use("/api/waitlist", apiLimiter);
  app.use("/api/contact", apiLimiter);

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV });
  });

  // Security: Secure Admin Login Route
  app.post("/api/admin/login", loginLimiter, (req, res) => {
    const { email, password } = req.body;
    
    // In a real app, use environment variables and bcrypt
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@homologaplus.com.br';
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || '7698398*Re';

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      // Return a mock session token
      const sessionToken = Buffer.from(Date.now() + "_" + ADMIN_EMAIL).toString('base64');
      return res.json({ success: true, token: sessionToken });
    }
    
    return res.status(401).json({ error: "Credenciais inválidas" });
  });

  // Helper to send confirmation email
  async function sendConfirmationEmail(name: string, email: string, rank: number) {
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured. Skipping email for:", email);
      return;
    }

    try {
      const shareUrl = `https://homologaplus.com.br/waitlist?ref=${encodeURIComponent(email.toLowerCase().trim())}`;
      const date = new Date().toLocaleDateString('pt-BR');
      
      await resend.emails.send({
        from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
        to: [email],
        subject: 'Sua posição na lista está garantida 🚀',
        html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>HOMOLOGA Plus</title>
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
    
    body { margin: 0; padding: 0; width: 100% !important; background-color: #050505; font-family: 'Inter', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #FFFFFF; }
    table { border-collapse: collapse; }
    .bento-card { background-color: #111111; border: 1px solid #222222; border-radius: 24px; padding: 32px; }
    .neon-text { color: #3B82F6; text-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
    .btn { background: #FFFFFF; color: #000000 !important; padding: 16px 32px; text-decoration: none; border-radius: 100px; font-weight: 700; display: inline-block; }
    
    @media only screen and (max-width: 600px) {
      .mobile-full { width: 100% !important; padding: 20px !important; }
      .display-text { font-size: 32px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; color: #FFFFFF;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 60px 0;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="mobile-full">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 40px;">
              <span style="font-size: 20px; font-weight: 900; letter-spacing: -1px; color: #FFFFFF;">HOMOLOGA <span style="color: #3B82F6;">+</span></span>
            </td>
          </tr>

          <!-- Main Bento -->
          <tr>
            <td class="bento-card" style="background-color: #111111; border: 1px solid #222222; border-radius: 32px; padding: 48px; text-align: center;">
              <h1 class="display-text" style="font-size: 42px; font-weight: 900; margin: 0; letter-spacing: -2px; line-height: 1.1;">VOCÊ ESTÁ <br/>NA LISTA.</h1>
              <p style="font-size: 16px; color: #888888; margin: 20px 0 40px 0; line-height: 1.5;">O futuro da homologação solar <br/>está sendo preparado para você.</p>
              
              <!-- Rank Circle -->
              <div style="margin-bottom: 40px;">
                <div style="display: inline-block; width: 140px; height: 140px; border: 2px solid #3B82F6; border-radius: 100px; position: relative;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
                    <tr>
                      <td align="center" valign="middle">
                        <span style="font-size: 12px; font-weight: 700; color: #3B82F6; display: block; margin-bottom: 4px;">RANK</span>
                        <span style="font-size: 42px; font-weight: 900; color: #FFFFFF; line-height: 1;">${rank}</span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <p style="font-size: 14px; color: #888888; margin: 0;">Aguarde nosso convite oficial.</p>
            </td>
          </tr>

          <!-- Secondary Bento Grid -->
          <tr>
            <td style="padding-top: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="290" class="bento-card" style="background-color: #111111; border: 1px solid #222222; border-radius: 24px; padding: 24px;">
                    <p style="font-size: 11px; font-weight: 700; color: #555555; margin: 0 0 8px 0; text-transform: uppercase;">STATUS</p>
                    <p style="font-size: 16px; font-weight: 700; color: #FFFFFF; margin: 0;">Acesso Confirmado</p>
                  </td>
                  <td width="20"></td>
                  <td width="290" class="bento-card" style="background-color: #111111; border: 1px solid #222222; border-radius: 24px; padding: 24px;">
                    <p style="font-size: 11px; font-weight: 700; color: #555555; margin: 0 0 8px 0; text-transform: uppercase;">DATA</p>
                    <p style="font-size: 16px; font-weight: 700; color: #FFFFFF; margin: 0;">${date}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Referral Bento -->
          <tr>
            <td style="padding-top: 20px;">
              <div class="bento-card" style="background-color: #3B82F6; border-radius: 32px; padding: 40px; text-align: center;">
                <h3 style="font-size: 20px; font-weight: 900; color: #FFFFFF; margin: 0 0 12px 0; letter-spacing: -0.5px;">QUER PULAR A FILA?</h3>
                <p style="font-size: 15px; color: rgba(255,255,255,0.8); margin: 0 0 32px 0; line-height: 1.4;">Indique um integrador e suba <br/><strong>7 posições</strong> na hora.</p>
                
                <table border="0" cellpadding="0" cellspacing="0" align="center">
                  <tr>
                    <td align="center" bgcolor="#FFFFFF" style="border-radius: 100px;">
                      <a href="${shareUrl}" target="_blank" style="font-size: 14px; font-family: 'Inter', sans-serif; color: #000000; text-decoration: none; border-radius: 100px; padding: 16px 40px; display: inline-block; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Copiar Link</a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 60px;">
              <p style="font-size: 12px; color: #444444; margin: 0;">HOMOLOGA PLUS — 2026</p>
              <p style="font-size: 11px; color: #222222; margin: 10px 0 0 0;">Você recebeu este e-mail porque se inscreveu em nossa lista.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      });
      console.log("Confirmation email sent to:", email);
    } catch (err) {
      console.error("Failed to send confirmation email:", err);
    }
  }

  // API Route for Waitlist (Supabase)
  app.get("/api/waitlist", async (req, res) => {
    const supabase = getSupabase();
    if (!supabase) {
      // Demo mode fallback
      return res.json({ count: 87, demo: true });
    }
    try {
      const { count, error } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });
      
      if (error) throw error;
      res.json({ count: (count || 0) + 87 });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch count" });
    }
  });

  app.post("/api/waitlist", async (req, res) => {
    const supabase = getSupabase();
    const { name, email, whatsapp, utm_source, utm_medium, utm_campaign, referrer } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!supabase) {
      // Demo mode fallback
      console.warn("Supabase not configured. Using demo mode for email:", email);
      const demoPosition = 88;
      sendConfirmationEmail(name || 'Integrador', email, demoPosition);
      return res.json({ success: true, position: demoPosition, demo: true });
    }

    try {
      const { data, error } = await supabase
        .from("waitlist")
        .upsert([
          { 
            name: name || '',
            email: email.toLowerCase().trim(), 
            whatsapp,
            utm_source,
            utm_medium,
            utm_campaign,
            referrer,
            created_at: new Date().toISOString()
          }
        ], { onConflict: 'email' })
        .select();

      if (error) throw error;

      const { count } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      const position = (count || 0) + 87;

      // Send confirmation email in background
      sendConfirmationEmail(name || 'Integrador', email, position);

      res.json({ success: true, position });
    } catch (err) {
      console.error('Waitlist API Error:', err);
      res.status(500).json({ error: "Failed to join waitlist" });
    }
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }

    // Security: Basic XSS sanitization for the message
    const sanitizedName = String(name).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedEmail = String(email).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedSubject = String(subject || 'Nova mensagem').replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedMessage = String(message).replace(/</g, "&lt;").replace(/>/g, "&gt;");

    try {
      const { data, error } = await resend.emails.send({
        from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
        to: ['contato@homologaplus.com.br'],
        subject: `Contato: ${sanitizedSubject}`,
        text: `Nome: ${sanitizedName}\nE-mail: ${sanitizedEmail}\nAssunto: ${sanitizedSubject}\n\nMensagem:\n${sanitizedMessage}`,
        html: `
          <h3>Nova mensagem de contato</h3>
          <p><strong>Nome:</strong> ${sanitizedName}</p>
          <p><strong>E-mail:</strong> ${sanitizedEmail}</p>
          <p><strong>Assunto:</strong> ${sanitizedSubject}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (error) throw error;
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // API Route for Email Confirmation
  app.post("/api/send-confirmation", async (req, res) => {
    const { email, rank } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    try {
      const { data, error } = await resend.emails.send({
        from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
        to: [email],
        subject: 'Você entrou na lista do HOMOLOGA Plus 🚀',
        html: `<h1>Acesso Confirmado!</h1><p>Sua posição: #${rank}</p>`,
      });

      if (error) throw error;
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
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
