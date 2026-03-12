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
  <title>Confirmação de Lista de Espera</title>
  <style type="text/css">
    body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important; background-color: #F3F5F9; font-family: 'Inter', Arial, sans-serif; }
    .content { width: 100%; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #0F2A5A 0%, #1E3A8A 100%); padding: 40px 20px; text-align: center; border-radius: 16px 16px 0 0; }
    .main-card { background: linear-gradient(135deg, #1E3A8A 0%, #0F2A5A 100%); border-radius: 16px; padding: 32px; text-align: center; margin: 20px 0; }
    .info-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
    .details-card { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
    .btn { background: linear-gradient(to right, #3B82F6, #1D4ED8); color: #FFFFFF !important; padding: 16px 32px; text-decoration: none; border-radius: 10px; font-weight: 600; display: inline-block; box-shadow: 0 8px 20px rgba(59,130,246,0.25); }
    .footer { background: #0F2A5A; padding: 40px 20px; text-align: center; color: #FFFFFF; border-radius: 0 0 16px 16px; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F3F5F9;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F3F5F9; padding: 20px 0;">
    <tr>
      <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #FFFFFF; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td class="header" style="background: #0F2A5A; background: linear-gradient(135deg, #0F2A5A 0%, #1E3A8A 100%); padding: 40px 20px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <span style="font-size: 24px; font-weight: 800; color: #FFFFFF; letter-spacing: -1px;">HOMOLOGA <span style="color: #60A5FA;">Plus</span></span>
              </div>
              <h1 style="font-size: 28px; font-weight: 700; color: #FFFFFF; margin: 0; line-height: 1.2;">Acesso Confirmado!</h1>
              <p style="font-size: 16px; color: #D6E2FF; margin: 10px 0 0 0;">Você está um passo à frente na gestão solar.</p>
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td style="padding: 40px 32px 20px 32px;">
              <p style="font-size: 18px; color: #1F2937; margin: 0; font-weight: 600;">Olá, ${name} 👋</p>
              <p style="font-size: 16px; color: #4B5563; line-height: 1.6; margin: 15px 0 0 0;">
                É um prazer ter você conosco. O <strong>HOMOLOGA Plus</strong> está sendo construído para transformar a forma como você gerencia seus projetos.
              </p>
            </td>
          </tr>

          <!-- Position Card -->
          <tr>
            <td style="padding: 0 32px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="main-card" style="background: #1E3A8A; background: linear-gradient(135deg, #1E3A8A 0%, #0F2A5A 100%); border-radius: 16px; padding: 32px; text-align: center;">
                <tr>
                  <td>
                    <p style="font-size: 12px; font-weight: 700; color: #CBD5E1; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 10px 0;">SUA POSIÇÃO NA FILA</p>
                    <h2 style="font-size: 56px; font-weight: 800; color: #93C5FD; margin: 0;">#${rank}</h2>
                    <p style="font-size: 14px; color: #D6E2FF; margin: 15px 0 0 0;">Você será notificado assim que for sua vez</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding: 32px;">
              <div class="details-card" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px;">
                <p style="font-size: 13px; font-weight: 700; color: #1E293B; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">DETALHES DA INSCRIÇÃO</p>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 5px 0; font-size: 14px; color: #64748b;">E-mail:</td>
                    <td style="padding: 5px 0; font-size: 14px; color: #1e293b; font-weight: 600; text-align: right;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; font-size: 14px; color: #64748b;">Produto:</td>
                    <td style="padding: 5px 0; font-size: 14px; color: #1e293b; font-weight: 600; text-align: right;">Plano Fundador</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; font-size: 14px; color: #64748b;">Data:</td>
                    <td style="padding: 5px 0; font-size: 14px; color: #1e293b; font-weight: 600; text-align: right;">${date}</td>
                  </tr>
                </table>
              </div>

              <!-- Next Steps -->
              <div class="info-card" style="background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 24px;">
                <h3 style="font-size: 16px; font-weight: 700; color: #1F2937; margin: 0 0 10px 0;">🚀 Quer subir na fila?</h3>
                <p style="font-size: 14px; color: #4B5563; line-height: 1.5; margin: 0 0 20px 0;">
                  Para cada integrador que entrar na lista através do seu link, você sobe <strong>7 posições</strong> e ganha prioridade.
                </p>
                <div style="text-align: center;">
                  <a href="${shareUrl}" class="btn" style="background: #3B82F6; background: linear-gradient(to right, #3B82F6, #1D4ED8); color: #FFFFFF !important; padding: 16px 32px; text-decoration: none; border-radius: 10px; font-weight: 600; display: inline-block;">Subir na Fila agora</a>
                </div>
              </div>

              <!-- Support -->
              <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 20px; text-align: center;">
                <p style="font-size: 14px; color: #1E40AF; margin: 0;">Precisa de ajuda? Responda este e-mail ou fale conosco no suporte.</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer" style="background: #0F2A5A; padding: 40px 32px; text-align: center; color: #FFFFFF;">
              <p style="font-size: 18px; font-weight: 800; margin: 0 0 10px 0;">HOMOLOGA <span style="color: #60A5FA;">Plus</span></p>
              <p style="font-size: 14px; color: #FFFFFF; margin: 0 0 20px 0; opacity: 0.8;">© 2026 HOMOLOGA Plus. Todos os direitos reservados.</p>
              <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                <p style="font-size: 12px; color: #9CA3AF; margin: 0; line-height: 1.5;">
                  Você está recebendo este e-mail porque se inscreveu na lista de espera do HOMOLOGA Plus.<br/>
                  Se não foi você, por favor desconsidere.
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
