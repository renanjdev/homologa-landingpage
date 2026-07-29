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

// Caixa que recebe o aviso de cada novo pedido de acesso.
const TEAM_EMAIL = process.env.SUPPORT_EMAIL || 'contato@homologaplus.com.br';

// Os dados vêm de um formulário público e são interpolados em HTML de e-mail.
const escapeHtml = (value: any) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

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

  if (req.method === 'GET') {
    if (!supabase) {
      return res.status(500).json({ error: "Supabase not configured. Please set SUPABASE_URL and SUPABASE_KEY." });
    }
    try {
      const { count, error } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return res.status(200).json({ count: (count || 0) + 82 });
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

    // O acesso ao teste é liberado manualmente pela equipe via WhatsApp,
    // então o número é obrigatório (mín. 10 dígitos = DDD + telefone).
    const whatsappDigits = String(whatsapp || '').replace(/\D/g, '');
    if (whatsappDigits.length < 10 || whatsappDigits.length > 13) {
      return res.status(400).json({ error: "O WhatsApp é obrigatório. Informe o número com DDD." });
    }

    // 1. Banco é BEST-EFFORT. O lead chega para a equipe por e-mail (passo 2),
    //    então um Supabase pausado/fora do ar não pode derrubar o formulário.
    let savedToDatabase = false;
    let position = 82;

    if (supabase) {
      try {
        const { error } = await supabase
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

        if (error) throw error;
        savedToDatabase = true;

        const { count } = await supabase
          .from("waitlist")
          .select("*", { count: "exact", head: true });
        position = (count || 0) + 82;
      } catch (dbErr: any) {
        console.error('Supabase indisponível — seguindo apenas com e-mail:', dbErr?.message || dbErr);
      }
    } else {
      console.warn('Supabase não configurado — lead entregue apenas por e-mail.');
    }

    // 2. Aviso interno: é assim que a equipe fica sabendo do pedido e chama no WhatsApp.
    let notifiedTeam = false;
    if (process.env.RESEND_API_KEY) {
      try {
        // wa.me exige DDI; o form aceita 10-11 dígitos (DDD + número).
        const waNumber = whatsappDigits.length <= 11 ? `55${whatsappDigits}` : whatsappDigits;
        const firstName = String(name || '').trim().split(' ')[0];
        const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
          `Olá${firstName ? ` ${firstName}` : ''}! Aqui é do Homologa Plus — recebemos seu pedido de acesso ao teste. Posso te explicar como funciona?`
        )}`;

        await resend.emails.send({
          from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
          to: [TEAM_EMAIL],
          replyTo: email,
          subject: `Novo pedido de acesso: ${name || 'sem nome'} — ${whatsapp}`,
          html: `
            <div style="font-family: -apple-system, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0F172A;">
              <h2 style="margin: 0 0 4px 0; font-size: 18px;">Novo pedido de acesso ao teste</h2>
              <p style="margin: 0 0 20px 0; color: #64748B; font-size: 13px;">
                ${new Date().toLocaleString('pt-BR')}${savedToDatabase ? '' : ' · <strong style="color:#B91C1C;">não gravado no banco</strong>'}
              </p>
              <table cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E2E8F0; border-radius: 8px; font-size: 14px;">
                <tr><td style="padding: 12px 16px; color: #64748B; border-bottom: 1px solid #F1F5F9;">Nome</td><td style="padding: 12px 16px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">${escapeHtml(name) || '—'}</td></tr>
                <tr><td style="padding: 12px 16px; color: #64748B; border-bottom: 1px solid #F1F5F9;">WhatsApp</td><td style="padding: 12px 16px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">${escapeHtml(whatsapp)}</td></tr>
                <tr><td style="padding: 12px 16px; color: #64748B; border-bottom: 1px solid #F1F5F9;">E-mail</td><td style="padding: 12px 16px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">${escapeHtml(email)}</td></tr>
                <tr><td style="padding: 12px 16px; color: #64748B; border-bottom: 1px solid #F1F5F9;">Origem</td><td style="padding: 12px 16px; border-bottom: 1px solid #F1F5F9;">${escapeHtml(utm_source) || '—'} / ${escapeHtml(utm_medium) || '—'} / ${escapeHtml(utm_campaign) || '—'}</td></tr>
                <tr><td style="padding: 12px 16px; color: #64748B;">Referrer</td><td style="padding: 12px 16px; word-break: break-all;">${escapeHtml(referrer) || '—'}</td></tr>
              </table>
              <p style="margin: 24px 0 0 0;">
                <a href="${waLink}" style="display: inline-block; background: #22C55E; color: #fff; text-decoration: none; font-weight: 700; padding: 14px 28px; border-radius: 8px; font-size: 15px;">Chamar no WhatsApp</a>
              </p>
              <p style="margin: 16px 0 0 0; color: #94A3B8; font-size: 12px;">Responder a este e-mail escreve direto para o lead.</p>
            </div>
          `,
        });
        notifiedTeam = true;
      } catch (notifyErr) {
        console.error('Falha ao notificar a equipe:', notifyErr);
      }
    }

    // 3. Send email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'HOMOLOGA Plus <contato@homologaplus.com.br>',
          to: [email],
          subject: 'Recebemos sua solicitação — falamos com você pelo WhatsApp',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Solicitação de acesso · HOMOLOGA Plus</title>
                <style>
                  @media screen and (max-width: 600px) {
                    .email-container { width: 100% !important; border-radius: 0 !important; }
                    .email-header { padding: 30px 20px !important; }
                    .email-body { padding: 30px 20px !important; }
                    .email-title { font-size: 24px !important; }
                    .detail-cell { display: block !important; width: 100% !important; text-align: left !important; padding: 5px 0 !important; border: none !important; }
                    .detail-value { font-size: 14px !important; padding-bottom: 15px !important; border-bottom: 1px solid #F8FAFC !important; }
                  }
                </style>
              </head>
              <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8FAFC; padding: 20px 0;">
                  <tr>
                    <td align="center">
                      <table class="email-container" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <!-- Header -->
                        <tr>
                          <td class="email-header" style="background-color: #1B2A4A; padding: 40px 30px; text-align: center; color: white;">
                            <div align="center" style="font-size: 20px; font-weight: bold; margin-bottom: 30px; text-align: center;">HOMOLOGA <span style="color: #60A5FA;">Plus</span></div>
                            <div align="center" style="width: 48px; height: 48px; border-radius: 50%; border: 1px solid #334155; margin: 0 auto 20px auto; text-align: center; line-height: 48px; font-size: 24px;">✅</div>
                            <h1 class="email-title" align="center" style="margin: 0 0 10px 0; font-size: 28px; font-weight: 800; color: #ffffff; text-align: center;">Solicitação recebida!</h1>
                            <p style="margin: 0; color: #94A3B8; font-size: 16px;">Em breve entraremos em contato pelo WhatsApp</p>
                          </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                          <td class="email-body" style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; font-size: 15px; color: #334155;">Olá, <strong style="color: #0F172A;">${escapeHtml(name) || 'Projetista'}</strong> 👋</p>
                            <p style="margin: 0 0 30px 0; font-size: 15px; color: #475569; line-height: 1.6;">
                              Recebemos sua solicitação de acesso ao <strong>HOMOLOGA Plus</strong>. O cadastro não é automático:
                              nossa equipe libera os acessos um a um, para acompanhar de perto cada teste.
                              <strong style="color: #0F172A;">Em breve falamos com você pelo WhatsApp</strong> para configurar
                              seu teste de <strong style="color: #0F172A;">3 dias</strong> — com o Homologa Full completo,
                              incluindo a Automação ilimitada, e sem cartão de crédito.
                            </p>

                            <!-- Detail List -->
                            <h3 style="margin: 0 0 15px 0; font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">Dados da sua solicitação</h3>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 35px;">
                              <tr>
                                <td style="padding: 15px 20px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                      <td width="30" class="detail-cell" style="color: #64748B; font-size: 14px;">✉️</td>
                                      <td class="detail-cell" style="color: #64748B; font-size: 14px; padding: 10px 0; border-bottom: 1px solid #F8FAFC;">E-mail</td>
                                      <td align="right" class="detail-cell detail-value" style="color: #0F172A; font-size: 14px; font-weight: 600; padding: 10px 0; border-bottom: 1px solid #F8FAFC;">${escapeHtml(email)}</td>
                                    </tr>
                                    <tr>
                                      <td width="30" class="detail-cell" style="color: #64748B; font-size: 14px;">📱</td>
                                      <td class="detail-cell" style="color: #64748B; font-size: 14px; padding: 10px 0; border-bottom: 1px solid #F8FAFC;">WhatsApp</td>
                                      <td align="right" class="detail-cell detail-value" style="color: #0F172A; font-size: 14px; font-weight: 600; padding: 10px 0; border-bottom: 1px solid #F8FAFC;">${escapeHtml(whatsapp)}</td>
                                    </tr>
                                    <tr>
                                      <td width="30" class="detail-cell" style="color: #64748B; font-size: 14px;">📅</td>
                                      <td class="detail-cell" style="color: #64748B; font-size: 14px; padding: 10px 0;">Data da solicitação</td>
                                      <td align="right" class="detail-cell detail-value" style="color: #0F172A; font-size: 14px; font-weight: 600; padding: 10px 0;">${new Date().toLocaleDateString('pt-BR')}</td>
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
                                        <div style="width: 32px; height: 32px; background-color: #EFF6FF; border-radius: 6px; text-align: center; line-height: 32px; font-size: 16px;">💬</div>
                                      </td>
                                      <td valign="middle" style="color: #475569; font-size: 14px; line-height: 1.5;">Nossa equipe chama você no WhatsApp que você cadastrou para entender sua operação.</td>
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
                                        <div style="width: 32px; height: 32px; background-color: #EFF6FF; border-radius: 6px; text-align: center; line-height: 32px; font-size: 16px;">🔑</div>
                                      </td>
                                      <td valign="middle" style="color: #475569; font-size: 14px; line-height: 1.5;">Criamos seu acesso e enviamos os dados de login — você não precisa se cadastrar sozinho.</td>
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
                                        <div style="width: 32px; height: 32px; background-color: #EFF6FF; border-radius: 6px; text-align: center; line-height: 32px; font-size: 16px;">⏱️</div>
                                      </td>
                                      <td valign="middle" style="color: #475569; font-size: 14px; line-height: 1.5;">Você usa o sistema completo por 3 dias, sem cartão de crédito e sem cobrança automática.</td>
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
                                      <td align="center" bgcolor="#22C55E" style="border-radius: 8px;">
                                        <a href="https://wa.me/5514991273245?text=${encodeURIComponent('Olá! Acabei de solicitar acesso ao teste do Homologa Plus.')}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 15px; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px;">💬 Falar agora no WhatsApp</a>
                                      </td>
                                    </tr>
                                  </table>
                                  <p style="margin: 12px 0 0 0; color: #94A3B8; font-size: 12px;">Quer adiantar? É só chamar a gente.</p>
                                </td>
                              </tr>
                            </table>

                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="background-color: #0F172A; padding: 30px; text-align: center;">
                            <div style="font-size: 16px; font-weight: bold; color: white; margin-bottom: 12px;">HOMOLOGA <span style="color: #3B82F6;">Plus</span></div>
                            <p style="margin: 0 0 8px 0; color: #94A3B8; font-size: 12px;">© ${new Date().getFullYear()} HOMOLOGA Plus. Todos os direitos reservados.</p>
                            <p style="margin: 0; color: #64748B; font-size: 11px;">Você está recebendo este e-mail porque solicitou acesso ao teste pelo nosso site.</p>
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

    // Sem banco E sem e-mail o pedido não chegaria a ninguém — nesse caso é
    // melhor o visitante ver o erro do que uma confirmação falsa.
    if (!savedToDatabase && !notifiedTeam) {
      return res.status(500).json({
        error: "Não foi possível registrar sua solicitação agora. Tente de novo ou chame a gente no WhatsApp.",
      });
    }

    return res.status(200).json({
      success: true,
      position,
      savedToDatabase,
      notifiedTeam
    });
  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(500).json({ error: "Internal server error", message: err.message });
  }
}
