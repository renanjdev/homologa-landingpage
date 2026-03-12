import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, whatsapp, rank, utm_source, utm_medium, utm_campaign } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  
  console.log("Novo lead (Vercel API):", {
    email: cleanEmail,
    whatsapp,
    rank,
    ip,
    utm_source,
    utm_medium,
    utm_campaign,
    timestamp: new Date().toISOString()
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
    return res.status(500).json({ error: "Email service not configured" });
  }

  try {
    const displayRank = rank || '---';
    
    const { data, error } = await resend.emails.send({
      from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
      to: [cleanEmail],
      subject: '🚀 Bem-vindo à lista de espera do HOMOLOGA Plus!',
      text: `Olá! Você está na lista de espera do HOMOLOGA Plus. Sua posição atual é #${displayRank}.`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
          <h1 style="color: #F27D26;">Você está na lista!</h1>
          <p>Olá,</p>
          <p>Ficamos muito felizes com seu interesse no <strong>HOMOLOGA Plus</strong>. Você acaba de garantir seu lugar na fila para a plataforma definitiva de gestão para projetistas solares.</p>
          
          <div style="background-color: #F8FAFC; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748B;">Sua posição atual</p>
            <p style="margin: 5px 0 0 0; font-size: 32px; font-weight: bold; color: #F27D26;">#${displayRank}</p>
          </div>

          <p><strong>Dica de Ouro:</strong> Quer subir na fila? Indique outros projetistas usando seu link exclusivo que você recebeu na página de confirmação.</p>
          
          <p>Em breve traremos mais novidades sobre o lançamento e o <strong>Plano Fundador</strong>.</p>
          
          <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 30px 0;" />
          <p style="font-size: 12px; color: #94A3B8;">Equipe HOMOLOGA Plus</p>
        </div>
      `,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Email Exception:', err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
