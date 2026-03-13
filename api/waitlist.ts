import { createClient } from "@supabase/supabase-js";
import { Resend } from 'resend';

let supabaseClient: any = null;

function getSupabase() {
  if (!supabaseClient) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;
    if (!url || !key) {
      return null;
    }
    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}

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
    return res.status(200).end();
  }

  const supabase = getSupabase();
  if (!supabase) {
    return res.status(500).json({ error: "Supabase not configured. Please set SUPABASE_URL and SUPABASE_KEY." });
  }
  
  if (req.method === 'GET') {
    try {
      const { count, error } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });
      
      if (error) throw error;
      return res.status(200).json({ count: (count || 0) + 87 });
    } catch (err: any) {
      return res.status(500).json({ error: "Failed to fetch count", message: err.message });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, whatsapp, utm_source, utm_medium, utm_campaign, referrer } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // 1. Save to Supabase
    const { data, error } = await supabase
      .from("waitlist")
      .upsert([
        { 
          name: name || null,
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

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: "Database error", details: error.message });
    }

    // 2. Get position (count)
    const { count, error: countError } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error('Supabase count error:', countError);
    }

    const position = (count || 0) + 87; // Adding base offset as in current app

    // 3. Send email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
          to: [email],
          subject: 'Você está na lista! 🎉',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Lista de Espera HOMOLOGA Plus</title>
              </head>
              <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8FAFC; padding: 20px 0;">
                  <tr>
                    <td align="center">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <!-- Header -->
                        <tr>
                          <td style="background-color: #0E1A35; padding: 40px 30px; text-align: center; color: white;">
                            <div style="font-size: 20px; font-weight: bold; margin-bottom: 30px;">HOMOLOGA <span style="color: #60A5FA;">Plus</span></div>
                            <div style="width: 48px; height: 48px; border-radius: 50%; border: 1px solid #334155; margin: 0 auto 20px auto; text-align: center; line-height: 48px; font-size: 24px;">🎉</div>
                            <h1 style="margin: 0 0 10px 0; font-size: 28px; font-weight: 800; color: #ffffff;">Você está na lista! 🎉</h1>
                            <p style="margin: 0; color: #94A3B8; font-size: 16px;">Sua vaga foi confirmada com sucesso</p>
                          </td>
                        </tr>
                        
                        <!-- Body -->
                        <tr>
                          <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; font-size: 15px; color: #334155;">Olá, <strong style="color: #0F172A;">\${name || 'Projetista'}</strong> 👋</p>
                            <p style="margin: 0 0 30px 0; font-size: 15px; color: #475569; line-height: 1.6;">
                              Obrigado por se inscrever na lista de espera do <strong>Nossa Plataforma</strong>! Estamos animados em ter você conosco. Em breve você terá acesso à plataforma.
                            </p>
                            
                            <!-- Position Card -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #172445; border-radius: 12px; margin-bottom: 30px;">
                              <tr>
                                <td align="center" style="padding: 30px;">
                                  <p style="margin: 0 0 10px 0; color: #94A3B8; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">SUA POSIÇÃO NA FILA</p>
                                  <p style="margin: 0 0 10px 0; font-size: 64px; font-weight: 900; color: #60A5FA; line-height: 1;">#\${position}</p>
                                  <p style="margin: 0; color: #94A3B8; font-size: 13px;">Você será notificado assim que for sua vez</p>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Detail List -->
                            <h3 style="margin: 0 0 15px 0; font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">Detalhes da inscrição</h3>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 35px;">
                              <tr>
                                <td style="padding: 15px 20px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                      <td width="30" style="color: #64748B; font-size: 14px;">✉️</td>
                                      <td style="color: #64748B; font-size: 14px; padding: 10px 0; border-bottom: 1px solid #F8FAFC;">Email</td>
                                      <td align="right" style="color: #0F172A; font-size: 14px; font-weight: 600; padding: 10px 0; border-bottom: 1px solid #F8FAFC;">\${email}</td>
                                    </tr>
                                    <tr>
                                      <td width="30" style="color: #64748B; font-size: 14px;">📦</td>
                                      <td style="color: #64748B; font-size: 14px; padding: 10px 0; border-bottom: 1px solid #F8FAFC;">Produto</td>
                                      <td align="right" style="color: #0F172A; font-size: 14px; font-weight: 600; padding: 10px 0; border-bottom: 1px solid #F8FAFC;">Nossa Plataforma</td>
                                    </tr>
                                    <tr>
                                      <td width="30" style="color: #64748B; font-size: 14px;">📅</td>
                                      <td style="color: #64748B; font-size: 14px; padding: 10px 0;">Data de inscrição</td>
                                      <td align="right" style="color: #0F172A; font-size: 14px; font-weight: 600; padding: 10px 0;">\${new Date().toLocaleDateString('pt-BR')}</td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Next Steps List -->
                            <h3 style="margin: 0 0 15px 0; font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">O que acontece agora?</h3>
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 12px;">
                              <tr>
                                <td style="padding: 15px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                      <td width="46" valign="middle">
                                        <div style="width: 32px; height: 32px; background-color: #EFF6FF; border-radius: 6px; text-align: center; line-height: 32px; font-size: 16px;">🔔</div>
                                      </td>
                                      <td valign="middle" style="color: #475569; font-size: 14px; line-height: 1.5;">Você receberá atualizações regulares sobre nosso progresso e novidades.</td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 12px;">
                              <tr>
                                <td style="padding: 15px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                      <td width="46" valign="middle">
                                        <div style="width: 32px; height: 32px; background-color: #EFF6FF; border-radius: 6px; text-align: center; line-height: 32px; font-size: 16px;">✉️</div>
                                      </td>
                                      <td valign="middle" style="color: #475569; font-size: 14px; line-height: 1.5;">Quando chegar sua vez, enviaremos um convite de acesso exclusivo.</td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 35px;">
                              <tr>
                                <td style="padding: 15px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                      <td width="46" valign="middle">
                                        <div style="width: 32px; height: 32px; background-color: #EFF6FF; border-radius: 6px; text-align: center; line-height: 32px; font-size: 16px;">🔗</div>
                                      </td>
                                      <td valign="middle" style="color: #475569; font-size: 14px; line-height: 1.5;">Compartilhe com amigos para avançar na fila mais rapidamente!</td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Button -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 35px;">
                              <tr>
                                <td align="center">
                                  <table border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td align="center" bgcolor="#2563EB" style="border-radius: 8px;">
                                        <a href="https://homologaplus.com.br" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 15px; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px;">🔗 Compartilhar com Amigos</a>
                                      </td>
                                    </tr>
                                  </table>
                                  <p style="margin: 12px 0 0 0; color: #94A3B8; font-size: 12px;">Cada indicação move você para cima na fila</p>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Help Card -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #EFF6FF; border-radius: 8px; border: 1px solid #DBEAFE;">
                              <tr>
                                <td align="center" style="padding: 16px;">
                                  <p style="margin: 0; color: #3B82F6; font-size: 13px; font-weight: 500;">💬 Tem dúvidas? Responda este email ou acesse nosso suporte.</p>
                                </td>
                              </tr>
                            </table>
                            
                          </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                          <td style="background-color: #0F172A; padding: 30px; text-align: center;">
                            <div style="font-size: 16px; font-weight: bold; color: white; margin-bottom: 12px;">HOMOLOGA <span style="color: #3B82F6;">Plus</span></div>
                            <p style="margin: 0 0 8px 0; color: #94A3B8; font-size: 12px;">© \${new Date().getFullYear()} Nossa Plataforma. Todos os direitos reservados.</p>
                            <p style="margin: 0; color: #64748B; font-size: 11px;">Você está recebendo este email porque se inscreveu na lista de espera.</p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Automation Note -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                          <td align="center" style="padding: 20px 0;">
                            <p style="margin: 0; color: #94A3B8; font-size: 11px;">Este é um email automático — por favor, não responda diretamente a este endereço.</p>
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
      } catch (emailErr) {
        console.error('Resend error:', emailErr);
      }
    }

    return res.status(200).json({
      success: true,
      position: position
    });
  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(500).json({ error: "Internal server error", message: err.message });
  }
}
