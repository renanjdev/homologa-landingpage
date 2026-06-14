import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Loader2, AlertCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { buildWhatsAppLink, formatWhatsApp, validateWhatsApp, validateEmail } from '../utils/whatsapp';

type Status = 'idle' | 'loading' | 'success' | 'error';

// Micro-conversão on-page: captura o lead que ainda não quer criar conta no app externo.
// Reaproveita o endpoint existente /api/waitlist e dispara um evento de conversão REAL
// no domínio (fbq Lead no submit), em vez de só no clique de saída.
const LeadCapture = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      setInputError('Por favor, insira seu nome completo.');
      return;
    }
    if (!validateEmail(email)) {
      setInputError('Por favor, insira um e-mail válido.');
      return;
    }
    if (!validateWhatsApp(whatsapp)) {
      setInputError('Por favor, insira um WhatsApp válido com DDD.');
      return;
    }
    setInputError(null);
    setStatus('loading');
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign'),
          referrer: document.referrer,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Não foi possível enviar agora. Tente novamente.');
      }
      if (window.fbq) window.fbq('track', 'Lead', { content_name: 'demo_landing' });
      setStatus('success');
    } catch (err: any) {
      setErrorMessage(err.message || 'Não foi possível enviar agora. Tente novamente.');
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10';

  return (
    <section id="demonstracao" className="py-16 md:py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 text-center"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="mb-2 font-display text-2xl font-bold text-slate-900">Recebemos seu contato!</h2>
                <p className="mx-auto mb-8 max-w-md text-slate-600">
                  Em breve nossa equipe vai falar com você. Se quiser adiantar, é só chamar no WhatsApp agora.
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href={buildWhatsAppLink('Olá! Acabei de pedir uma demonstração do Homologa Plus pelo site.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => window.fbq && window.fbq('track', 'Contact')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-success px-6 py-3.5 font-bold text-white shadow-lg shadow-success/30 transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="h-5 w-5" /> Falar agora no WhatsApp
                  </a>
                  <a
                    href="https://app.homologaplus.com.br/cadastro"
                    onClick={() => window.fbq && window.fbq('track', 'Lead')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3.5 font-bold text-primary transition-colors hover:border-primary"
                  >
                    Ou comece o teste grátis <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-8 text-center">
                  <h2 className="mb-3 text-clamp-h2 font-display font-bold text-slate-900">
                    Prefere ver funcionando antes de assinar?
                  </h2>
                  <p className="mx-auto max-w-xl text-slate-600">
                    Deixe seu contato e a gente te mostra o Homologa Plus na prática, sem compromisso. Atendimento
                    humano, de quem entende de homologação solar.
                  </p>
                </div>
                <form onSubmit={submit} className="space-y-4">
                  <input
                    type="text"
                    aria-label="Nome completo"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (inputError) setInputError(null);
                    }}
                    placeholder="Seu nome completo"
                    className={inputClass}
                  />
                  <input
                    type="email"
                    aria-label="E-mail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (inputError) setInputError(null);
                    }}
                    placeholder="Seu melhor e-mail"
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    aria-label="WhatsApp"
                    value={whatsapp}
                    onChange={(e) => {
                      setWhatsapp(formatWhatsApp(e.target.value));
                      if (inputError) setInputError(null);
                    }}
                    placeholder="WhatsApp com DDD"
                    className={inputClass}
                  />
                  {(inputError || status === 'error') && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3.5 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 shrink-0" /> {inputError || errorMessage}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-dark disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <>
                        Quero uma demonstração <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400">Sem compromisso. Seus dados estão seguros.</p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
