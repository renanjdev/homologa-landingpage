import { Resend } from 'resend';
import { getEmailHtml } from './email-template';

/**
 * Helper to set CORS headers
 */
function setCorsHeaders(res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  res.setHeader('Cache-Control', 'no-store, max-age=0');
}

export default async function handler(req: any, res: any) {
  try {
    setCorsHeaders(res);

    // Handle preflight request
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Health check and environment info
    if (req.method === 'GET') {
      return res.status(200).json({ 
        status: 'ok', 
        message: 'HOMOLOGA Plus API is active', 
        config: {
          hasResendKey: !!process.env.RESEND_API_KEY,
          environment: process.env.NODE_ENV
        }
      });
    }

    // Only allow POST for sending emails
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { 
      email, 
      whatsapp, 
      rank, 
      utm_source, 
      utm_medium, 
      utm_campaign, 
      referrer 
    } = req.body || {};
    
    const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown';
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    
    // Log lead information
    console.log("[API] Novo Lead Recebido:", {
      email: cleanEmail,
      whatsapp,
      rank,
      ip,
      utm: { utm_source, utm_medium, utm_campaign },
      referrer,
      timestamp: new Date().toISOString()
    });

    // Validation
    if (!cleanEmail) {
      return res.status(400).json({ error: "Email é obrigatório" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: "Formato de email inválido" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    console.log('[API] Verificando API Key:', { 
      exists: !!apiKey, 
      length: apiKey?.length,
      nodeEnv: process.env.NODE_ENV 
    });

    if (!apiKey) {
      console.error('[API] Erro: RESEND_API_KEY não configurada');
      return res.status(500).json({ error: "Serviço de email não configurado no servidor" });
    }

    const resend = new Resend(apiKey);
    console.log('[API] Resend inicializado');
    const displayRank = rank || '---';
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
      to: [cleanEmail],
      subject: 'Você entrou na lista do HOMOLOGA Plus 🚀',
      text: `Olá! Seu acesso antecipado foi confirmado. Você agora faz parte do grupo de projetistas que terão prioridade no lançamento da plataforma HOMOLOGA Plus. SUA POSIÇÃO NA FILA: #${displayRank}.`,
      html: getEmailHtml(displayRank),
    });

    if (error) {
      console.error('[API] Erro no Resend:', error);
      return res.status(400).json({ error: "Falha ao enviar email", details: error });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Email enviado com sucesso",
      data 
    });

  } catch (err: any) {
    console.error('[API] Erro Global:', err);
    return res.status(500).json({ 
      error: "Erro Interno do Servidor", 
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}
