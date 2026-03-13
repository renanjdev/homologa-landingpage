import React, { useState, useEffect, useMemo } from 'react';
import { Shield, Users, Mail, Phone, Calendar, Search, Download, MessageCircle, LogOut, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import * as XLSX from 'xlsx';

interface Lead {
  id: string;
  name: string | null;
  email: string;
  whatsapp: string | null;
  created_at: string;
  utm_source?: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  // Persistência de Sessão
  useEffect(() => {
    const session = localStorage.getItem('homologa_admin_session');
    if (session === 'active') {
      setIsAuthenticated(true);
      fetchLeads();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Hardcoded credentials check client side as first layer
    if (email === 'admin@homologaplus.com.br' && password === '7698398*Re') {
      setIsAuthenticated(true);
      localStorage.setItem('homologa_admin_session', 'active');
      await fetchLeads();
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('homologa_admin_session');
    setIsAuthenticated(false);
    setLeads([]);
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const b64Token = btoa('admin@homologaplus.com.br:7698398*Re');
      const response = await fetch('/api/leads', {
        headers: {
          'Authorization': `Basic ${b64Token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        setError('Erro ao buscar leads. Verifique a configuração.');
      }
    } catch (err) {
      setError('Falha de conexão com a API.');
    }
    setLoading(false);
  };

  // Cálculo de Métricas (Memoizado para performance)
  const metrics = useMemo(() => {
    const total = leads.length;
    
    // Leads nas últimas 24h
    const now = new Date();
    const leadsToday = leads.filter(l => {
      const leadDate = new Date(l.created_at);
      const diffInHours = (now.getTime() - leadDate.getTime()) / (1000 * 60 * 60);
      return diffInHours <= 24;
    }).length;

    // Melhor Origem (Top Source)
    const sources: Record<string, number> = {};
    leads.forEach(l => {
      const src = l.utm_source || 'Direto / Orgânico';
      sources[src] = (sources[src] || 0) + 1;
    });
    
    let topSource = 'N/A';
    let maxCount = 0;
    Object.entries(sources).forEach(([src, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topSource = src;
      }
    });

    return { total, leadsToday, topSource };
  }, [leads]);

  const filteredLeads = leads.filter(lead => 
    lead.email.toLowerCase().includes(search.toLowerCase()) || 
    (lead.name && lead.name.toLowerCase().includes(search.toLowerCase())) ||
    (lead.whatsapp && lead.whatsapp.includes(search))
  );

  const exportToExcel = () => {
    const dataToExport = filteredLeads.map((lead, index) => ({
      'Posição': index + 1,
      'Nome': lead.name || 'Não informado',
      'Email': lead.email,
      'WhatsApp': lead.whatsapp || 'Não informado',
      'Origem': lead.utm_source || 'Orgânico',
      'Data': new Date(lead.created_at).toLocaleString('pt-BR')
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads Waitlist");

    const wscols = [{wch: 10}, {wch: 30}, {wch: 40}, {wch: 20}, {wch: 20}, {wch: 25}];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, `HOMOLOGAPlus_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">Administração Restrita</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-medium transition-colors mt-4 flex justify-center"
            >
              {loading ? 'Validando...' : 'Acessar Painel'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Painel Admin
            </h1>
            <p className="text-slate-500 text-sm mt-1">Gestão inteligente de leads e conversão.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar lead..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
              title="Sair do painel"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total de Leads</p>
              <p className="text-2xl font-bold text-slate-900">{metrics.total}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Últimas 24h</p>
              <p className="text-2xl font-bold text-slate-900">+{metrics.leadsToday}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Melhor Origem</p>
              <p className="text-lg font-bold text-slate-900 truncate max-w-[150px]" title={metrics.topSource}>
                {metrics.topSource}
              </p>
            </div>
          </div>
        </div>

        {/* Table Actions */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Listagem Detalhada
          </h2>
          <button 
            onClick={exportToExcel}
            disabled={leads.length === 0}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Exportar XLS
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 text-slate-700 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Lead</th>
                  <th className="px-6 py-4 font-semibold">Contato</th>
                  <th className="px-6 py-4 font-semibold">Origem</th>
                  <th className="px-6 py-4 font-semibold">Data</th>
                  <th className="px-6 py-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                      Carregando leads...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                      Nenhum lead encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          {lead.name || 'Projetista'}
                        </div>
                      </td>
                      <td className="px-6 py-4 space-y-1">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="w-4 h-4 text-slate-400" />
                          {lead.email}
                        </div>
                        {lead.whatsapp && (
                          <div className="flex items-center gap-2 text-slate-500 text-xs">
                            <Phone className="w-4 h-4 text-slate-400" />
                            {lead.whatsapp}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                          {lead.utm_source || 'Direto'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-500 text-xs">
                          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-slate-400 text-[10px]">
                          {new Date(lead.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {lead.whatsapp && (
                          <a 
                            href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${lead.name || 'Projetista'}, vi que você se inscreveu na lista de espera do HOMOLOGA Plus! Tudo bem?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 p-2 rounded-lg hover:bg-emerald-50 inline-flex items-center gap-1 transition-colors"
                            title="Chamar no WhatsApp"
                          >
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-xs font-bold sm:inline hidden">Chat</span>
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
