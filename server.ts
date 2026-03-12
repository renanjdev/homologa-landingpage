import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { createClient } from "@supabase/supabase-js";

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

const resend = new Resend(process.env.RESEND_API_KEY || '');

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV });
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
        subject: 'Você entrou na lista do HOMOLOGA Plus 🚀',
        html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>HOMOLOGA Plus - Confirmação</title>
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    body { margin: 0; padding: 0; width: 100% !important; background-color: #F8FAFC; font-family: 'Inter', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    table { border-collapse: collapse; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #E2E8F0; }
    .header { background-color: #0F172A; padding: 60px 40px; text-align: center; }
    .hero-card { background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); border-radius: 20px; padding: 40px; margin: -40px 40px 0 40px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
    .btn { background: #3B82F6; color: #ffffff !important; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; display: inline-block; transition: all 0.2s; }
    
    @media only screen and (max-width: 600px) {
      .hero-card { margin: -30px 20px 0 20px !important; padding: 30px 20px !important; }
      .container { border-radius: 0 !important; border: none !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 40px 0;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="background-color: #ffffff; border-radius: 24px; border: 1px solid #E2E8F0;">
          
          <!-- Header -->
          <tr>
            <td class="header" style="background-color: #0F172A; padding: 80px 40px; text-align: center;">
              <div style="margin-bottom: 24px;">
                <span style="font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">HOMOLOGA <span style="color: #3B82F6;">Plus</span></span>
              </div>
              <h1 style="font-size: 32px; font-weight: 700; color: #FFFFFF; margin: 0; letter-spacing: -1px;">Bem-vindo à elite solar.</h1>
              <p style="font-size: 16px; color: #94A3B8; margin: 12px 0 0 0;">Sua reserva para o acesso antecipado foi confirmada.</p>
            </td>
          </tr>

          <!-- Position Widget -->
          <tr>
            <td>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="hero-card" style="background: #1E293B; border-radius: 20px; padding: 40px; text-align: center; border: 1px solid rgba(255,255,255,0.1);">
                    <p style="font-size: 12px; font-weight: 700; color: #94A3B8; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 16px 0;">POSIÇÃO ATUAL NA LISTA</p>
                    <div style="display: inline-block; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 100px; padding: 8px 24px; margin-bottom: 16px;">
                      <span style="font-size: 56px; font-weight: 800; color: #3B82F6; line-height: 1;">#${rank}</span>
                    </div>
                    <p style="font-size: 15px; color: #CBD5E1; margin: 0; font-weight: 500;">Você está entre os primeiros integradores.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 60px 50px 40px 50px;">
              <p style="font-size: 18px; color: #0F172A; margin: 0; font-weight: 700;">Olá, ${name}!</p>
              <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 16px 0 0 0;">
                Obrigado por se juntar a nós. Estamos finalizando os últimos detalhes para entregar a você a plataforma de homologação mais rápida do Brasil.
              </p>

              <!-- Stats Grid -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 40px;">
                <tr>
                  <td width="48%" style="background-color: #F1F5F9; border-radius: 16px; padding: 20px;">
                    <p style="font-size: 11px; font-weight: 700; color: #64748B; margin: 0 0 4px 0; text-transform: uppercase;">PLANO RESERVADO</p>
                    <p style="font-size: 15px; font-weight: 700; color: #0F172A; margin: 0;">Fundador</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background-color: #F1F5F9; border-radius: 16px; padding: 20px;">
                    <p style="font-size: 11px; font-weight: 700; color: #64748B; margin: 0 0 4px 0; text-transform: uppercase;">DATA DE ENTRADA</p>
                    <p style="font-size: 15px; font-weight: 700; color: #0F172A; margin: 0;">${date}</p>
                  </td>
                </tr>
              </table>

              <!-- Referral Action -->
              <div style="margin-top: 40px; padding: 32px; background-color: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 20px; text-align: center;">
                <h3 style="font-size: 18px; font-weight: 700; color: #0F172A; margin: 0 0 8px 0;">Quer pular etapas?</h3>
                <p style="font-size: 14px; color: #64748B; margin: 0 0 24px 0;">Indique um colega integrador e suba <strong>7 posições</strong> instantaneamente.</p>
                
                <table border="0" cellpadding="0" cellspacing="0" align="center">
                  <tr>
                    <td align="center" bgcolor="#3B82F6" style="border-radius: 12px;">
                      <a href="${shareUrl}" target="_blank" style="font-size: 15px; font-family: 'Inter', sans-serif; color: #ffffff; text-decoration: none; border-radius: 12px; padding: 16px 40px; display: inline-block; font-weight: 700;">Copiar meu link de convite</a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 40px 50px; text-align: center; border-top: 1px solid #E2E8F0;">
              <p style="font-size: 14px; font-weight: 600; color: #0F172A; margin: 0 0 8px 0;">HOMOLOGA Plus</p>
              <p style="font-size: 12px; color: #94A3B8; margin: 0 0 24px 0;">A inteligência que o seu setor de engenharia precisava.</p>
              
              <div style="border-top: 1px solid #E2E8F0; padding-top: 24px;">
                <p style="font-size: 11px; color: #94A3B8; margin: 0; line-height: 1.5;">
                  Este e-mail foi enviado para ${email}.<br/>
                  © 2026 HOMOLOGA Plus. Todos os direitos reservados.
                </p>
              </div>
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

    try {
      const { data, error } = await resend.emails.send({
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
