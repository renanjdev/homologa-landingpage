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
      subject: '🚀 Bem-vindo à lista de espera do HOMOLOGA Plus!',
      text: `Olá! Você está na lista de espera do HOMOLOGA Plus. Sua posição atual é #${displayRank}.`,
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
                  <h1 style="color: #1E293B; font-size: 28px; margin: 0 0 20px 0; font-weight: 800;">Você está na lista! 🚀</h1>
                  <p style="color: #64748B; font-size: 16px; line-height: 1.6; margin: 0;">
                    Ficamos muito felizes com seu interesse no <strong>HOMOLOGA Plus</strong>. Você acaba de garantir seu lugar na fila para a plataforma definitiva de gestão para projetistas solares.
                  </p>
                </td>
              </tr>

              <!-- Rank Card -->
              <tr>
                <td style="padding: 0 30px;">
                  <div style="background-color: #F8FAFC; padding: 30px; border-radius: 20px; border: 2px dashed #E2E8F0; text-align: center;">
                    <p style="margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8; font-weight: 700;">Sua posição atual na fila</p>
                    <p style="margin: 10px 0 0 0; font-size: 48px; font-weight: 900; color: #F27D26;">#${displayRank}</p>
                  </div>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="margin-bottom: 25px;">
                    <h3 style="color: #1E293B; margin: 0 0 10px 0;">O que vem por aí?</h3>
                    <p style="color: #64748B; font-size: 15px; line-height: 1.5; margin: 0;">
                      Estamos finalizando os últimos detalhes para entregar a melhor experiência em homologação solar do Brasil. Você receberá um aviso prioritário assim que liberarmos o acesso.
                    </p>
                  </div>
                  
                  <div style="background-color: #FFF7ED; border-left: 4px solid #F27D26; padding: 15px 20px; border-radius: 0 12px 12px 0;">
                    <p style="color: #C2410C; font-size: 14px; margin: 0;">
                      <strong>Dica:</strong> Quer subir na fila? Indique outros projetistas usando seu link exclusivo que você recebeu na página de confirmação.
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px; background-color: #F1F5F9; text-align: center; border-radius: 0 0 16px 16px;">
                  <p style="margin: 0 0 15px 0; color: #94A3B8; font-size: 12px;">
                    © 2026 HOMOLOGA Plus. Todos os direitos reservados.<br>
                    A plataforma inteligente para o setor fotovoltaico.
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
