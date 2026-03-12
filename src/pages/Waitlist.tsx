import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Mail, CheckCircle2, Phone, ArrowLeft, Zap, ShieldCheck, Loader2, AlertCircle, Sun, ChevronRight, Share2, Trophy } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useWaitlist } from '../hooks/useWaitlist';
import { formatWhatsApp, validateWhatsApp, validateEmail } from '../utils/whatsapp';

const WaitlistHeader = () => (
  <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 py-4 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-primary p-1.5 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
          <Sun className="w-6 h-6 text-white" />
        </div>
        <span className="text-lg font-display font-bold tracking-tight text-slate-900">
          HOMOLOGA <span className="text-primary">Plus</span>
        </span>
      </Link>
      <Link 
        to="/" 
        className="text-sm font-medium text-slate-600 hover:text-primary flex items-center gap-1 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao site
      </Link>
    </div>
  </nav>
);

const WaitlistHero = ({ waitlistCount }: { waitlistCount: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center lg:text-left"
  >
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6">
      <Trophy className="w-3.5 h-3.5" />
      Oportunidade Antecipada
    </div>
    
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 leading-tight mb-6">
      Estamos preparando algo <span className="text-primary">extraordinário</span>.
    </h1>
    
    <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
      O <strong>HOMOLOGA Plus</strong> está chegando para revolucionar a gestão de homologação solar. Entre na lista e garanta benefícios exclusivos de lançamento.
    </p>

    <div className="mb-8 inline-block lg:block">
      <div className="flex items-center gap-4 justify-center lg:justify-start">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <img 
              key={i}
              src={`https://picsum.photos/seed/user${i}/100/100`} 
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm">
            +{waitlistCount - 4}
          </div>
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Tempo Real</span>
          </div>
          <p className="text-lg font-bold text-slate-900">
            <span className="text-primary">{waitlistCount}</span> / 100 vagas do plano fundador
          </p>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (waitlistCount / 100) * 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 mb-8">
      <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
      <div className="text-left">
        <p className="font-bold text-slate-900">Benefício Exclusivo</p>
        <p className="text-sm text-slate-600">Os primeiros usuários terão acesso ao <strong>plano fundador</strong> com condições especiais e vitalícias.</p>
      </div>
    </div>

    <p className="text-xs text-slate-400 italic">
      "Ferramenta criada por quem trabalha diariamente com projetos e homologação de usinas fotovoltaicas."
    </p>
  </motion.div>
);

const SuccessState = ({ 
  userInitialRank, 
  userReferrals, 
  userId, 
  onReset 
}: { 
  userInitialRank: number; 
  userReferrals: number; 
  userId: string | null;
  onReset: () => void;
}) => {
  const currentRank = Math.max(1, userInitialRank - (userReferrals * 7));
  const nextRank = Math.max(1, currentRank - 21);

  const shareOnWhatsApp = () => {
    const shareUrl = `${window.location.origin}/waitlist?ref=${userId}`;
    const text = `🚀 Acabei de entrar na lista de espera do *HOMOLOGA Plus*!\n\nA plataforma definitiva para *gestão de projetos e homologação* solar. ☀️\n\nFeito de projetista para projetista. Organize seus processos e ganhe escala. Garanta sua vaga no *Plano Fundador* antes que as 100 vagas acabem! ⏳\n\nEntre pelo meu link para subir na fila:\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center py-4"
    >
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Você entrou na lista de espera!</h2>
      
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-8">
        <p className="text-slate-600 text-sm mb-1 uppercase tracking-wider font-bold">Sua posição atual</p>
        <p className="text-4xl font-display font-black text-primary">
          #{currentRank}
        </p>
        <p className="text-xs text-slate-500 mt-2">
          {userReferrals > 0 
            ? `Você já subiu ${userReferrals * 7} posições com indicações!` 
            : "Indique amigos para subir na fila e ter acesso prioritário."}
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6">
        <h3 className="font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Suba na fila agora
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Convide 3 integradores e suba para <span className="font-bold text-primary">#{nextRank}</span>.
        </p>
        <button 
          onClick={shareOnWhatsApp}
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-emerald-200 transition-all active:scale-95"
        >
          <Share2 className="w-5 h-5" />
          Compartilhar no WhatsApp
        </button>
      </div>

      <button 
        onClick={onReset}
        className="text-slate-400 text-sm hover:text-primary transition-colors"
      >
        Cadastrar outro número
      </button>
    </motion.div>
  );
};

const WaitlistForm = ({ 
  onSubmit, 
  status, 
  errorMessage 
}: { 
  onSubmit: (whatsapp: string, email: string) => void;
  status: string;
  errorMessage: string;
}) => {
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateWhatsApp(whatsapp)) {
      setInputError('Por favor, insira um número de WhatsApp válido com DDD.');
      return;
    }
    if (!validateEmail(email)) {
      setInputError('Por favor, insira um e-mail válido.');
      return;
    }
    onSubmit(whatsapp, email);
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsapp(formatted);
    if (inputError) setInputError(null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (inputError) setInputError(null);
  };

  return (
    <motion.div
      key="form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Entrar na lista de acesso antecipado</h2>
      <p className="text-slate-500 mb-8">
        Seja um dos primeiros a utilizar a plataforma que vai mudar sua rotina.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
            Seu melhor e-mail (obrigatório)
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={handleEmailChange}
              placeholder="exemplo@email.com"
              className={`w-full bg-slate-50 border rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-4 transition-all text-lg ${
                inputError?.includes('e-mail')
                  ? 'border-red-300 focus:ring-red-100 focus:border-red-400' 
                  : 'border-slate-200 focus:ring-primary/10 focus:border-primary'
              }`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-semibold text-slate-700 mb-2">
            Seu WhatsApp (obrigatório)
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              id="whatsapp"
              required
              value={whatsapp}
              onChange={handleWhatsappChange}
              placeholder="(00) 00000-0000"
              className={`w-full bg-slate-50 border rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-4 transition-all text-lg ${
                inputError?.includes('WhatsApp') 
                  ? 'border-red-300 focus:ring-red-100 focus:border-red-400' 
                  : 'border-slate-200 focus:ring-primary/10 focus:border-primary'
              }`}
            />
          </div>
        </div>

        {(status === 'error' || inputError) && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {inputError || errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
        >
          {status === 'loading' ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              Quero acesso antecipado
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center gap-6 opacity-50 grayscale">
        <img src="https://i.imgur.com/NruoIEi.png" alt="Partner" className="h-6 object-contain" loading="lazy" />
        <img src="https://i.imgur.com/NruoIEi.png" alt="Partner" className="h-6 object-contain" loading="lazy" />
      </div>
    </motion.div>
  );
};

const Waitlist = () => {
  const [searchParams] = useSearchParams();
  const referralId = searchParams.get('ref');
  
  const {
    status,
    errorMessage,
    waitlistCount,
    userId,
    userReferrals,
    userInitialRank,
    joinWaitlist,
    resetStatus
  } = useWaitlist(referralId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Helmet>
        <title>Lista de Espera | HOMOLOGA Plus - Acesso Antecipado</title>
        <meta name="description" content="Entre na lista de espera do HOMOLOGA Plus e garanta benefícios exclusivos de lançamento." />
      </Helmet>

      <WaitlistHeader />

      <main className="flex-1 flex items-center justify-center p-4 py-8 md:py-20">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <WaitlistHero waitlistCount={waitlistCount} />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-slate-100 relative"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <SuccessState 
                  userId={userId}
                  userInitialRank={userInitialRank}
                  userReferrals={userReferrals}
                  onReset={resetStatus}
                />
              ) : (
                <WaitlistForm 
                  onSubmit={joinWaitlist}
                  status={status}
                  errorMessage={errorMessage}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} HOMOLOGA Plus. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Waitlist;
