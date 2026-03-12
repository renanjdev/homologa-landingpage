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
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="x-apple-disable-message-reformatting">
  <title>Confirmação HOMOLOGA Plus</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
    
    body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important; background-color: #F3F5F9; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    img { line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; }
    table { border-collapse: collapse !important; }
    
    @media only screen and (max-width: 600px) {
      .content { width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .position-number { font-size: 48px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F3F5F9;">
  <!-- Preheader Text -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    Sua posição #${rank} na lista do HOMOLOGA Plus está confirmada! Veja como ganhar prioridade no lançamento.
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F3F5F9; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="content" style="background-color: #FFFFFF; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          
          <!-- Header Hero -->
          <tr>
            <td style="background-color: #0F2A5A; background: linear-gradient(135deg, #0F2A5A 0%, #1E3A8A 100%); padding: 60px 40px; text-align: center; position: relative;">
              <!-- Decorative Circles (CSS fallback for non-VML) -->
              <div style="margin-bottom: 25px;">
                <span style="font-size: 26px; font-weight: 800; color: #FFFFFF; letter-spacing: -1px;">HOMOLOGA <span style="color: #60A5FA;">Plus</span></span>
              </div>
              <h1 style="font-size: 32px; font-weight: 700; color: #FFFFFF; margin: 0; line-height: 1.2;">Acesso Confirmado!</h1>
              <p style="font-size: 17px; color: #D6E2FF; margin: 12px 0 0 0; opacity: 0.9;">Você está um passo à frente na gestão solar.</p>
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td class="mobile-padding" style="padding: 45px 50px 20px 50px;">
              <p style="font-size: 18px; color: #1F2937; margin: 0; font-weight: 600;">Olá, ${name} 👋</p>
              <p style="font-size: 16px; color: #4B5563; line-height: 1.7; margin: 15px 0 0 0;">
                É um prazer ter você conosco. O <strong>HOMOLOGA Plus</strong> está sendo construído para ser a ferramenta definitiva para integradores que buscam escala e eficiência.
              </p>
            </td>
          </tr>

          <!-- Position Card -->
          <tr>
            <td class="mobile-padding" style="padding: 10px 50px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1E3A8A; background: linear-gradient(135deg, #1E3A8A 0%, #0F2A5A 100%); border-radius: 20px; text-align: center;">
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="font-size: 13px; font-weight: 700; color: #CBD5E1; letter-spacing: 2.5px; text-transform: uppercase; margin: 0 0 12px 0;">SUA POSIÇÃO NA FILA</p>
                    <h2 class="position-number" style="font-size: 64px; font-weight: 800; color: #93C5FD; margin: 0; line-height: 1;">#${rank}</h2>
                    <p style="font-size: 15px; color: #D6E2FF; margin: 18px 0 0 0; font-weight: 500;">Você será notificado assim que for sua vez</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Details & Referral -->
          <tr>
            <td class="mobile-padding" style="padding: 30px 50px 50px 50px;">
              
              <!-- Details Box -->
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px; padding: 25px; margin-bottom: 30px;">
                <p style="font-size: 13px; font-weight: 700; color: #1E293B; margin: 0 0 18px 0; text-transform: uppercase; letter-spacing: 1px;">DETALHES DA INSCRIÇÃO</p>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #64748b;">E-mail:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1e293b; font-weight: 600; text-align: right;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #64748b;">Produto:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1e293b; font-weight: 600; text-align: right;">Plano Fundador</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #64748b;">Data:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1e293b; font-weight: 600; text-align: right;">${date}</td>
                  </tr>
                </table>
              </div>

              <!-- Referral Section -->
              <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 16px; padding: 30px; text-align: center;">
                <h3 style="font-size: 18px; font-weight: 700; color: #1F2937; margin: 0 0 12px 0;">🚀 Quer subir na fila?</h3>
                <p style="font-size: 15px; color: #4B5563; line-height: 1.6; margin: 0 0 25px 0;">
                  Para cada integrador que entrar na lista através do seu link, você sobe <strong>7 posições</strong> e ganha prioridade máxima.
                </p>
                
                <!-- Bulletproof Button -->
                <table border="0" cellpadding="0" cellspacing="0" align="center">
                  <tr>
                    <td align="center" bgcolor="#3B82F6" style="border-radius: 12px; background: linear-gradient(to right, #3B82F6, #1D4ED8); box-shadow: 0 8px 20px rgba(59,130,246,0.3);">
                      <a href="${shareUrl}" target="_blank" style="font-size: 16px; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 12px; padding: 18px 35px; border: 1px solid #3B82F6; display: inline-block; font-weight: 700;">Subir na Fila Agora</a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Support Box -->
              <div style="background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 20px; text-align: center; margin-top: 30px;">
                <p style="font-size: 14px; color: #1E40AF; margin: 0; font-weight: 500;">
                  Dúvidas? Responda este e-mail ou chame nosso suporte.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0F2A5A; padding: 50px 40px; text-align: center; color: #FFFFFF;">
              <p style="font-size: 20px; font-weight: 800; margin: 0 0 12px 0;">HOMOLOGA <span style="color: #60A5FA;">Plus</span></p>
              <p style="font-size: 14px; color: #FFFFFF; margin: 0 0 25px 0; opacity: 0.7;">© 2026 HOMOLOGA Plus. Todos os direitos reservados.</p>
              
              <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 25px;">
                <p style="font-size: 12px; color: #9CA3AF; margin: 0; line-height: 1.6; max-width: 400px; margin: 0 auto;">
                  Você recebeu este e-mail porque se inscreveu na lista de espera do HOMOLOGA Plus. Se não foi você, apenas ignore este e-mail.
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
