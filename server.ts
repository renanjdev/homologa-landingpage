import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Waitlist
  app.post("/api/waitlist", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      // Send Email via Resend
      const { data, error } = await resend.emails.send({
        from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
        to: [email],
        subject: 'Bem-vindo à lista VIP do HOMOLOGA Plus! 🚀',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155;">
            <h1 style="color: #0ea5e9;">Você está na lista VIP! 🚀</h1>
            <p>Olá,</p>
            <p>Recebemos seu interesse no <strong>HOMOLOGA Plus</strong>. É um prazer ter você conosco nesta fase Alpha!</p>
            <p>Como prometido, você acaba de garantir benefícios exclusivos:</p>
            <ul>
              <li><strong>Prioridade Máxima:</strong> Você será avisado antes de todo mundo quando abrirmos novas vagas.</li>
              <li><strong>Plano Fundador:</strong> Acesso a um valor de assinatura promocional e vitalício, disponível apenas para quem está nesta lista.</li>
            </ul>
            <p>Estamos trabalhando duro para entregar a melhor plataforma de gestão de homologação solar do mercado.</p>
            <p>Em breve traremos mais novidades!</p>
            <br />
            <p>Atenciosamente,<br /><strong>Equipe HOMOLOGA Plus</strong></p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #94a3b8;">Este é um e-mail automático. Não é necessário responder.</p>
          </div>
        `,
      });

      if (error) {
        console.error('Resend Error:', error);
        return res.status(500).json({ error: "Failed to send email" });
      }

      res.json({ success: true, data });
    } catch (err) {
      console.error('Server Error:', err);
      res.status(500).json({ error: "Internal server error" });
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
    const distPath = path.join(process.cwd(), 'dist');
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
