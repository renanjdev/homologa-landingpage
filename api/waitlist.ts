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
    const { email, whatsapp, utm_source, utm_medium, utm_campaign, referrer } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // 1. Save to Supabase
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
          subject: 'Você entrou na lista do HOMOLOGA Plus 🚀',
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
                  <tr>
                    <td style="padding: 40px 30px; text-align: center;">
                      <h1 style="color: #1E293B; font-size: 28px; margin: 0 0 20px 0; font-weight: 800;">Acesso Confirmado! 🚀</h1>
                      <p style="color: #64748B; font-size: 16px; line-height: 1.6; margin: 0;">
                        Olá!<br><br>
                        Seu acesso antecipado foi confirmado. Você agora faz parte do grupo de projetistas que terão prioridade no lançamento da plataforma <strong>HOMOLOGA Plus</strong>.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 30px;">
                      <div style="background-color: #F8FAFC; padding: 30px; border-radius: 20px; border: 2px dashed #E2E8F0; text-align: center;">
                        <p style="margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8; font-weight: 700;">SUA POSIÇÃO NA FILA</p>
                        <p style="margin: 10px 0 0 0; font-size: 48px; font-weight: 900; color: #F27D26;">#${position}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #64748B; font-size: 15px; line-height: 1.6; text-align: center; margin: 0;">
                        Estamos preparando a plataforma que vai simplificar a homologação de usinas fotovoltaicas nas concessionárias.<br><br>
                        Em breve enviaremos novidades do lançamento.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px; background-color: #F1F5F9; text-align: center; border-radius: 0 0 16px 16px;">
                      <p style="margin: 0 0 10px 0; color: #1E293B; font-size: 14px; font-weight: 700;">
                        Equipe HOMOLOGA Plus
                      </p>
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
