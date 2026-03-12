import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  try {
    // Enable CORS and disable cache
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method === 'GET') {
      return res.status(200).json({ 
        status: 'ok', 
        message: 'API is alive', 
        env: {
          hasResendKey: !!process.env.RESEND_API_KEY,
          nodeEnv: process.env.NODE_ENV
        }
      });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, whatsapp, rank, utm_source, utm_medium, utm_campaign, referrer } = req.body || {};
    
    // Vercel specific IP detection
    const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown';

    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    
    console.log("Novo lead (Vercel API):", {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing in environment variables');
      return res.status(500).json({ error: "Email service not configured" });
    }

    const resend = new Resend(apiKey);
    const displayRank = rank || '---';
    
    const { data, error } = await resend.emails.send({
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
          <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);">
              <!-- Header -->
              <tr>
                <td align="center" style="padding: 40px 0; background-color: #ffffff; border-bottom: 1px solid #F1F5F9;">
                  <img src="https://i.imgur.com/PqVmFJJ.png" alt="HOMOLOGA Plus" width="220" style="display: block; max-width: 80%;" referrerPolicy="no-referrer">
                </td>
              </tr>
              
              <!-- Hero -->
              <tr>
                <td style="padding: 48px 40px 40px 40px; text-align: center;">
                  <h1 style="color: #0F172A; font-size: 32px; margin: 0 0 16px 0; font-weight: 800; letter-spacing: -0.02em;">Acesso Confirmado! 🚀</h1>
                  <p style="color: #475569; font-size: 17px; line-height: 1.6; margin: 0;">
                    Olá!<br><br>
                    Seu acesso antecipado foi confirmado. Você agora faz parte do grupo de projetistas que terão prioridade no lançamento da plataforma <strong>HOMOLOGA Plus</strong>.
                  </p>
                </td>
              </tr>

              <!-- Rank Card -->
              <tr>
                <td style="padding: 0 40px;">
                  <div style="background: linear-gradient(to bottom, #F8FAFC, #ffffff); padding: 40px 20px; border-radius: 24px; border: 1px solid #E2E8F0; text-align: center;">
                    <p style="margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748B; font-weight: 700;">Sua posição na fila</p>
                    <p style="margin: 12px 0 0 0; font-size: 64px; font-weight: 900; color: #2563EB; letter-spacing: -0.02em;">#${displayRank}</p>
                  </div>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <div style="margin-bottom: 32px; text-align: center;">
                    <p style="color: #0F172A; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 600;">
                      Os primeiros usuários terão acesso ao <span style="color: #2563EB;">Plano Fundador</span> com condições especiais.
                    </p>
                  </div>
                  
                  <div style="background-color: #FFF7ED; border-left: 4px solid #F97316; padding: 24px; border-radius: 0 20px 20px 0; margin-bottom: 32px;">
                    <h4 style="color: #9A3412; margin: 0 0 8px 0; font-size: 16px; font-weight: 700;">💡 Quer subir na fila?</h4>
                    <p style="color: #9A3412; font-size: 15px; margin: 0; line-height: 1.5; opacity: 0.9;">
                      Compartilhe seu link exclusivo com outros projetistas solares. Cada indicação válida faz você subir posições.
                    </p>
                  </div>

                  <p style="color: #64748B; font-size: 15px; line-height: 1.7; text-align: center; margin: 0;">
                    Estamos preparando a plataforma que vai simplificar a homologação de usinas fotovoltaicas nas concessionárias.<br><br>
                    Em breve enviaremos novidades do lançamento.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 40px; background-color: #F8FAFC; text-align: center; border-top: 1px solid #E2E8F0;">
                  <p style="margin: 0 0 8px 0; color: #0F172A; font-size: 15px; font-weight: 700;">
                    Equipe HOMOLOGA Plus
                  </p>
                  <p style="margin: 0 0 24px 0; color: #94A3B8; font-size: 13px; line-height: 1.5;">
                    Ferramenta criada por quem trabalha diariamente com projetos e homologação solar.
                  </p>
                  <div style="display: inline-block; margin: 0 12px;">
                    <a href="https://homologaplus.com.br" style="color: #2563EB; text-decoration: none; font-size: 13px; font-weight: 600;">Website</a>
                  </div>
                  <div style="display: inline-block; margin: 0 12px;">
                    <a href="https://instagram.com/homologaplus" style="color: #2563EB; text-decoration: none; font-size: 13px; font-weight: 600;">Instagram</a>
                  </div>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error('Global API Exception:', err);
    return res.status(500).json({ 
      error: "Internal Server Error", 
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}
