import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  CheckCircle2, 
  Phone,
  ArrowLeft, 
  Zap, 
  ShieldCheck, 
  Star,
  Loader2,
  AlertCircle,
  Sun,
  ChevronRight,
  Share2,
  Users,
  Trophy
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, doc, onSnapshot, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

const Waitlist = () => {
  const [searchParams] = useSearchParams();
  const referralId = searchParams.get('ref');
  
  const [whatsapp, setWhatsapp] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [inputError, setInputError] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(87); // Default fake value
  const [userId, setUserId] = useState<string | null>(null);
  const [userReferrals, setUserReferrals] = useState(0);
  const [userInitialRank, setUserInitialRank] = useState(0);

  // Listen to real-time counter
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'stats', 'global'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        // Start at 87 if count is low
        setWaitlistCount(Math.max(87, data.waitlistCount || 0));
      }
    });
    return () => unsub();
  }, []);

  // Listen to user's own document for referral updates
  useEffect(() => {
    if (!userId) return;
    const unsub = onSnapshot(doc(db, 'waitlist', userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUserReferrals(data.referralCount || 0);
        setUserInitialRank(data.initialRank || 0);
      }
    });
    return () => unsub();
  }, [userId]);

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      let formatted = numbers;
      if (numbers.length > 2) {
        formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      }
      if (numbers.length > 7) {
        formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
      }
      return formatted;
    }
    return value.slice(0, 15);
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsapp(formatted);
    if (inputError) setInputError(false);
  };

  const validateWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.length >= 10 && numbers.length <= 11;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateWhatsApp(whatsapp)) {
      setInputError(true);
      setStatus('error');
      setErrorMessage('Por favor, insira um número de WhatsApp válido com DDD.');
      return;
    }

    setStatus('loading');
    try {
      const currentRank = waitlistCount + 1;
      
      // 1. Save to Firestore
      const waitlistData: any = {
        whatsapp,
        createdAt: serverTimestamp(),
        source: 'waitlist_page',
        initialRank: currentRank,
        referralCount: 0
      };
      
      if (referralId) {
        waitlistData.referral = referralId;
        // Increment referralCount of the referrer
        try {
          await updateDoc(doc(db, 'waitlist', referralId), {
            referralCount: increment(1)
          });
        } catch (err) {
          console.error('Error updating referrer:', err);
        }
      }

      const docRef = await addDoc(collection(db, 'waitlist'), waitlistData);

      setUserId(docRef.id);
      setUserInitialRank(currentRank);

      // 2. Increment global counter
      const statsRef = doc(db, 'stats', 'global');
      const statsSnap = await getDoc(statsRef);
      
      if (statsSnap.exists()) {
        await updateDoc(statsRef, {
          waitlistCount: increment(1)
        });
      } else {
        // Initialize if not exists
        await setDoc(statsRef, {
          waitlistCount: 88 // 87 (base) + 1
        });
      }

      setStatus('success');
      setWhatsapp('');
    } catch (error: any) {
      console.error('Error joining waitlist:', error);
      setStatus('error');
      setErrorMessage('Ocorreu um erro ao salvar seu contato. Por favor, tente novamente.');
    }
  };

  const shareOnWhatsApp = () => {
    const shareUrl = `${window.location.origin}/waitlist?ref=${userId}`;
    const text = `🚀 Acabei de entrar na lista de espera do *HOMOLOGA Plus*!\n\nA plataforma definitiva para *gestão de projetos e homologação* solar. ☀️\n\nFeito de projetista para projetista. Organize seus processos e ganhe escala. Garanta sua vaga no *Plano Fundador* antes que as 100 vagas acabem! ⏳\n\nEntre pelo meu link para subir na fila:\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Helmet>
        <title>Lista de Espera | HOMOLOGA Plus - Acesso Antecipado</title>
        <meta name="description" content="Entre na lista de espera do HOMOLOGA Plus e garanta benefícios exclusivos de lançamento." />
      </Helmet>

      {/* Header */}
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

      <main className="flex-1 flex items-center justify-center p-4 py-8 md:py-20">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Content Side */}
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

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-slate-100 relative"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
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
                      #{Math.max(1, userInitialRank - (userReferrals * 7))}
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
                      Convide 3 integradores e suba para <span className="font-bold text-primary">#{Math.max(1, (userInitialRank - (userReferrals * 7)) - 21)}</span>.
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
                    onClick={() => setStatus('idle')}
                    className="text-slate-400 text-sm hover:text-primary transition-colors"
                  >
                    Cadastrar outro número
                  </button>
                </motion.div>
              ) : (
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

                  <form onSubmit={handleSubmit} className="space-y-6">
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
                            inputError 
                              ? 'border-red-300 focus:ring-red-100 focus:border-red-400' 
                              : 'border-slate-200 focus:ring-primary/10 focus:border-primary'
                          }`}
                        />
                      </div>
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {errorMessage}
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
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
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
