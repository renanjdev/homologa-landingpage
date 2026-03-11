import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  CheckCircle2, 
  Mail, 
  ArrowLeft, 
  Zap, 
  ShieldCheck, 
  Star,
  Loader2,
  AlertCircle,
  Sun,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      // 1. Save to Firestore (Frontend)
      await addDoc(collection(db, 'waitlist'), {
        email,
        createdAt: serverTimestamp(),
        source: 'waitlist_page'
      });

      // 2. Send Confirmation Email (Backend)
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      setStatus('success');
      setEmail('');
    } catch (error: any) {
      console.error('Error joining waitlist:', error);
      setStatus('error');
      setErrorMessage('Ocorreu um erro ao salvar seu e-mail. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Helmet>
        <title>Lista de Espera | HOMOLOGA Plus - Plano Fundador</title>
        <meta name="description" content="Entre na lista de espera do HOMOLOGA Plus para garantir o Plano Fundador com valor promocional exclusivo no lançamento." />
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
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 leading-tight mb-4 md:mb-6">
              Estamos preparando algo <span className="text-primary">extraordinário</span>.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              O <strong>HOMOLOGA Plus</strong> está chegando para revolucionar a gestão de homologação solar. 
              Entre na lista e garanta benefícios exclusivos de lançamento.
            </p>
            
            <div className="space-y-3 md:space-y-4 mb-8 flex flex-col items-center lg:items-start">
              {[
                { icon: Star, text: 'Prioridade no lançamento oficial', color: 'text-amber-500' },
                { icon: ShieldCheck, text: 'Acesso exclusivo ao Plano Fundador', color: 'text-emerald-500' },
                { icon: CheckCircle2, text: 'Valor de assinatura promocional vitalício', color: 'text-primary' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 w-full max-w-xs lg:max-w-none justify-start">
                  <div className={`p-1.5 rounded-full bg-slate-100 ${item.color} shrink-0`}>
                    <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-slate-700 font-medium text-sm md:text-base text-left">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Você está na lista!</h2>
                  <p className="text-slate-600 mb-8">
                    Obrigado pelo interesse. Você será o primeiro a saber quando abrirmos novas vagas e garantirá seu benefício de <strong>Plano Fundador</strong>.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-primary font-bold hover:underline"
                  >
                    Cadastrar outro e-mail
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Garanta sua vaga</h2>
                  <p className="text-slate-500 mb-8">
                    Deixe seu melhor e-mail para ser avisado assim que liberarmos o acesso público.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                        E-mail Profissional
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com.br"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl">
                        <AlertCircle className="w-4 h-4" />
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          Quero ser avisado
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-slate-400 text-center mt-6">
                    Prometemos não enviar spam. Seus dados estão seguros conosco.
                  </p>
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
