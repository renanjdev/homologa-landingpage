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
  async function sendConfirmationEmail(email: string, rank: number) {
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured. Skipping email for:", email);
      return;
    }

    try {
      const shareUrl = `https://homologaplus.com.br/waitlist?ref=${encodeURIComponent(email.toLowerCase().trim())}`;
      
      await resend.emails.send({
        from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
        to: [email],
        subject: 'Você entrou na lista do HOMOLOGA Plus 🚀',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #f59e0b; margin-bottom: 10px;">HOMOLOGA Plus</h1>
              <p style="font-size: 18px; color: #64748b;">Sua jornada para uma homologação solar eficiente começa aqui.</p>
            </div>
            
            <div style="background-color: #f8fafc; border-radius: 24px; padding: 40px; text-align: center; border: 1px solid #e2e8f0;">
              <p style="text-transform: uppercase; font-size: 12px; font-weight: bold; letter-spacing: 1px; color: #64748b; margin-bottom: 10px;">Sua posição na fila</p>
              <h2 style="font-size: 48px; color: #f59e0b; margin: 0;">#${rank}</h2>
              <p style="margin-top: 20px; font-size: 16px; line-height: 1.6;">
                Parabéns! Você garantiu seu lugar entre os primeiros integradores que terão acesso ao <strong>Plano Fundador</strong>.
              </p>
            </div>

            <div style="margin-top: 30px; padding: 20px; border-radius: 16px; background-color: #fffbeb; border: 1px solid #fef3c7;">
              <h3 style="margin-top: 0; color: #92400e;">🚀 Quer subir na fila?</h3>
              <p style="font-size: 14px; color: #b45309;">
                Para cada integrador que entrar na lista através do seu link, você sobe <strong>7 posições</strong> e ganha prioridade no lançamento.
              </p>
              <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #fde68a; font-family: monospace; font-size: 12px; margin: 15px 0; word-break: break-all;">
                ${shareUrl}
              </div>
            </div>

            <div style="text-align: center; margin-top: 40px; font-size: 12px; color: #94a3b8;">
              <p>&copy; ${new Date().getFullYear()} HOMOLOGA Plus. Todos os direitos reservados.</p>
              <p>Este é um e-mail automático, por favor não responda.</p>
            </div>
          </div>
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
    const { email, whatsapp, utm_source, utm_medium, utm_campaign, referrer } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!supabase) {
      // Demo mode fallback
      console.warn("Supabase not configured. Using demo mode for email:", email);
      const demoPosition = 88;
      sendConfirmationEmail(email, demoPosition);
      return res.json({ success: true, position: demoPosition, demo: true });
    }

    try {
      const { data, error } = await supabase
        .from("waitlist")
        .upsert([
          { 
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
      sendConfirmationEmail(email, position);

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
