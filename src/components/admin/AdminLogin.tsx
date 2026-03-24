import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

interface LoginProps {
  onLogin: (status: boolean) => void;
}

export default function AdminLogin({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Armazenamos o token de sessão retornado de forma mais segura que apenas um "active"
        localStorage.setItem('homologa_admin_session', data.token);
        onLogin(true);
      } else {
        setError(data.error || 'Credenciais inválidas. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor de autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl max-w-md w-full border border-slate-700/50"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20 shadow-inner">
            <Shield className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Painel de Gestão SaaS</h2>
          <p className="text-slate-400 text-sm">Insira suas credenciais para continuar</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-sm text-center"
            >
              {error}
            </motion.div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email Corporativo</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@homologaplus.com.br"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Senha de Acesso</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl font-bold transition-all mt-6 flex justify-center shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Validando Acesso...' : 'Acessar Workspace'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
