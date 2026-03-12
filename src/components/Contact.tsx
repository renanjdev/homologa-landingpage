import React from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, User, Tag, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact Error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
            Ficou com alguma dúvida?
          </h2>
          <p className="text-lg text-slate-600">
            Nossa equipe está pronta para te ajudar. Envie sua mensagem e responderemos o mais breve possível.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Canais de Atendimento
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">E-mail</p>
                    <p className="text-slate-600">suporte@homologaplus.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">WhatsApp</p>
                    <p className="text-slate-600">Atendimento prioritário para integradores</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20">
              <h3 className="text-xl font-bold mb-4">Por que falar conosco?</h3>
              <ul className="space-y-3">
                {[
                  'Dúvidas sobre os planos e recursos',
                  'Suporte técnico especializado',
                  'Sugestões de novas funcionalidades',
                  'Parcerias e oportunidades de negócio'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-primary-foreground/90">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100"
          >
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Mensagem Enviada!</h3>
                <p className="text-slate-600 mb-8">
                  Obrigado pelo contato. Nossa equipe analisará sua mensagem e retornará em breve.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-primary font-bold hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <User className="w-4 h-4" /> Nome Completo
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> E-mail
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Assunto
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Qual o motivo do contato?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Mensagem
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Como podemos te ajudar?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark disabled:bg-slate-300 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                >
                  {status === 'loading' ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className="text-center text-red-500 text-sm font-medium">
                    Ocorreu um erro ao enviar. Tente novamente mais tarde.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
