import React, { useState } from 'react';
import { Reveal } from '../lib/anim';
import { CheckCircle2, Loader2, AlertCircle, MessageCircle, ArrowRight, Lock } from 'lucide-react';
import { buildWhatsAppLink, formatWhatsApp, validateWhatsApp, validateEmail } from '../utils/whatsapp';
import { REQUEST_ACCESS_ID, TRIAL_DIAS } from '../utils/cta';

type Status = 'idle' | 'loading' | 'success' | 'error';

// Cadastro livre fechado: este formulário é o ÚNICO caminho de entrada.
// A equipe cadastra o acesso manualmente no admin da plataforma e avisa pelo
// WhatsApp — por isso o WhatsApp é obrigatório. Reaproveita o endpoint
// /api/waitlist e dispara o fbq('Lead') REAL no domínio, no submit.
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
      setInputError('O WhatsApp é obrigatório — é por ele que liberamos seu acesso. Informe com DDD.');
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
      if (window.fbq) window.fbq('track', 'Lead', { content_name: 'solicitacao_acesso' });
      setStatus('success');
    } catch (err: any) {
      setErrorMessage(err.message || 'Não foi possível enviar agora. Tente novamente.');
      setStatus('error');
    }
  };

  const labelClass = 'mb-1.5 block text-sm font-semibold text-slate-700';
  const inputClass =
    'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10';

  return (
    <section id={REQUEST_ACCESS_ID} className="scroll-mt-24 py-16 md:py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            {status === 'success' ? (
              <Reveal
                key="ok"
                trigger="mount"
                scale={0.95}
                className="py-4 text-center"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="mb-2 font-display text-2xl font-bold text-slate-900">Solicitação recebida!</h2>
                <p className="mx-auto mb-3 max-w-md text-slate-600">
                  <strong className="font-semibold text-slate-900">Em breve entraremos em contato pelo WhatsApp</strong> para
                  entender sua operação e liberar seu acesso de {TRIAL_DIAS} dias.
                </p>
                <p className="mx-auto mb-8 max-w-md text-sm text-slate-500">
                  Fique de olho no número que você cadastrou. Se preferir adiantar, é só chamar a gente agora.
                </p>
                <div className="flex justify-center">
                  <a
                    href={buildWhatsAppLink('Olá! Acabei de solicitar acesso ao teste do Homologa Plus pelo site.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => window.fbq && window.fbq('track', 'Contact')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-success px-6 py-3.5 font-bold text-white shadow-lg shadow-success/30 transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="h-5 w-5" /> Falar agora no WhatsApp
                  </a>
                </div>
              </Reveal>
            ) : (
              <Reveal key="form" trigger="mount">
                <div className="mb-8 text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    <Lock className="h-3.5 w-3.5" /> Acesso liberado pela nossa equipe
                  </span>
                  <h2 className="mb-3 mt-4 text-clamp-h2 font-display font-bold text-slate-900">
                    Solicite seu teste de {TRIAL_DIAS} dias
                  </h2>
                  <p className="mx-auto max-w-xl text-slate-600">
                    O cadastro não é automático: nós liberamos os acessos um a um. Deixe seus dados e{' '}
                    <strong className="font-semibold text-slate-900">em breve entraremos em contato pelo WhatsApp</strong>{' '}
                    para configurar seu teste com o Homologa Full completo — com a Automação ilimitada e sem cartão de crédito.
                  </p>
                </div>
                <form onSubmit={submit} className="space-y-4" noValidate>
                  <div>
                    <label className={labelClass} htmlFor="lead-nome">Nome completo</label>
                    <input
                      id="lead-nome"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (inputError) setInputError(null);
                      }}
                      placeholder="Seu nome completo"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="lead-email">E-mail</label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (inputError) setInputError(null);
                      }}
                      placeholder="Seu melhor e-mail"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="lead-whatsapp">
                      WhatsApp <span className="text-primary">(obrigatório)</span>
                    </label>
                    <input
                      id="lead-whatsapp"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="numeric"
                      aria-describedby="lead-whatsapp-hint"
                      value={whatsapp}
                      onChange={(e) => {
                        setWhatsapp(formatWhatsApp(e.target.value));
                        if (inputError) setInputError(null);
                      }}
                      placeholder="(00) 00000-0000"
                      className={inputClass}
                    />
                    <p id="lead-whatsapp-hint" className="mt-1.5 text-xs text-slate-500">
                      É por aqui que a gente fala com você e libera o acesso.
                    </p>
                  </div>
                  {(inputError || status === 'error') && (
                    <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3.5 text-sm text-red-600">
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
                        Solicitar meu acesso <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    Sem cartão de crédito. Seus dados estão seguros e não são compartilhados.
                  </p>
                </form>
              </Reveal>
            )}
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
