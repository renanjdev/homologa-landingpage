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
  status?: string;
  notes?: string;
}

const STATUS_OPTIONS = [
  { label: 'Novo', color: 'bg-blue-100 text-blue-700' },
  { label: 'Em Contato', color: 'bg-amber-100 text-amber-700' },
  { label: 'Convertido', color: 'bg-emerald-100 text-emerald-700' },
  { label: 'Perdido', color: 'bg-slate-100 text-slate-600' }
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  
  // Filtros de Data
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  const updateLeadStatus = async (id: string, newStatus: string) => {
    const oldLeads = [...leads];
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));

    try {
      const b64Token = btoa('admin@homologaplus.com.br:7698398*Re');
      const response = await fetch('/api/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${b64Token}`
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar no banco de dados');
      }
    } catch (err: any) {
      console.error('Failed to update status:', err);
      // 2. Reverte em caso de erro
      setLeads(oldLeads);
      alert(`⚠️ Erro ao salvar: ${err.message}`);
    }
  };

  const updateLeadNotes = async (id: string, newNotes: string) => {
    try {
      const b64Token = btoa('admin@homologaplus.com.br:7698398*Re');
      await fetch('/api/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${b64Token}`
        },
        body: JSON.stringify({ id, notes: newNotes })
      });
      // Update local state smoothly
      setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: newNotes } : l));
    } catch (err) {
      console.error('Failed to update notes:', err);
    }
  };

  const handleWhatsappClick = (lead: Lead) => {
    if (lead.status === 'Novo' || !lead.status) {
      updateLeadStatus(lead.id, 'Em Contato');
    }
    
    const phone = lead.whatsapp?.replace(/\D/g, '');
    const text = `Olá ${lead.name || 'Projetista'}, vi que você se inscreveu na lista de espera do HOMOLOGA Plus! Tudo bem?`;
    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const metrics = useMemo(() => {
    const total = leads.length;
    
    const now = new Date();
    const leadsToday = leads.filter(l => {
      const leadDate = new Date(l.created_at);
      const diffInHours = (now.getTime() - leadDate.getTime()) / (1000 * 60 * 60);
      return diffInHours <= 24;
    }).length;

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

    const converted = leads.filter(l => l.status === 'Convertido').length;
    const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : 0;

    return { total, leadsToday, topSource, converted, conversionRate };
  }, [leads]);

  const [statusFilter, setStatusFilter] = useState('Todos');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.email.toLowerCase().includes(search.toLowerCase()) || 
      (lead.name && lead.name.toLowerCase().includes(search.toLowerCase())) ||
      (lead.whatsapp && lead.whatsapp.includes(search));
    
    const matchesStatus = statusFilter === 'Todos' || lead.status === statusFilter || (!lead.status && statusFilter === 'Novo');
    
    // Filtro de Data
    const leadDate = new Date(lead.created_at).toISOString().split('T')[0];
    const matchesStartDate = !startDate || leadDate >= startDate;
    const matchesEndDate = !endDate || leadDate <= endDate;
    
    return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
  });

  const exportToExcel = () => {
    const dataToExport = filteredLeads.map((lead, index) => ({
      'Posição': index + 1,
      'Nome': lead.name || 'Não informado',
      'Email': lead.email,
      'WhatsApp': lead.whatsapp || 'Não informado',
      'Status': lead.status || 'Novo',
      'Origem': lead.utm_source || 'Orgânico',
      'Notas': lead.notes || '',
      'Data': new Date(lead.created_at).toLocaleString('pt-BR')
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads Waitlist");

    const wscols = [{wch: 10}, {wch: 30}, {wch: 40}, {wch: 20}, {wch: 20}, {wch: 20}, {wch: 40}, {wch: 25}];
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
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex bg-slate-100 border border-slate-200 rounded-lg p-1">
              <button 
                onClick={() => setStatusFilter('Todos')}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${statusFilter === 'Todos' ? 'bg-white shadow text-primary' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Todos
              </button>
              {STATUS_OPTIONS.map(opt => (
                <button 
                  key={opt.label}
                  onClick={() => setStatusFilter(opt.label)}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${statusFilter === opt.label ? 'bg-white shadow text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {opt.label}
                </button>
              ))}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Leads</p>
              <p className="text-2xl font-bold text-slate-900">{metrics.total}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Convertidos</p>
              <p className="text-2xl font-bold text-slate-900">{metrics.converted}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-primary/5 p-3 rounded-xl text-primary">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Taxa de Conv.</p>
              <p className="text-2xl font-bold text-slate-900">{metrics.conversionRate}%</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Melhor Origem</p>
              <p className="text-lg font-bold text-slate-900 truncate max-w-[120px]" title={metrics.topSource}>
                {metrics.topSource}
              </p>
            </div>
          </div>
        </div>

        {/* Table Actions & Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-end flex-1">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Nome, email ou whatsapp..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              
              <div className="flex gap-2 items-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">Início</span>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-primary transition-all outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">Fim</span>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-primary transition-all outline-none"
                  />
                </div>
                {(startDate || endDate) && (
                  <button 
                    onClick={() => { setStartDate(''); setEndDate(''); }}
                    className="mt-5 text-xs text-rose-500 hover:text-rose-600 font-medium underline"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>

            <button 
              onClick={exportToExcel}
              disabled={leads.length === 0}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:shadow-emerald-200 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Exportar XLS
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 text-slate-700 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Lead</th>
                  <th className="px-6 py-4 font-semibold">Contato</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Observações</th>
                  <th className="px-6 py-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <p className="text-slate-400">Carregando leads...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                      Nenhum resultado para os filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 max-w-[200px]">
                        <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400 group-hover:text-primary/60" />
                          <span className="truncate">{lead.name || 'Projetista'}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5 bg-slate-50 w-fit px-1.5 py-0.5 rounded border border-slate-100">
                          <TrendingUp className="w-3 h-3" />
                          {lead.utm_source || 'Orgânico'}
                        </div>
                        <div className="text-[9px] text-slate-400 mt-1 ml-1 flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </td>
                      <td className="px-6 py-4 space-y-1">
                        <div className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate max-w-[150px]">{lead.email}</span>
                        </div>
                        {lead.whatsapp && (
                          <div className="flex items-center gap-2 text-slate-500 text-xs">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {lead.whatsapp}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={lead.status || 'Novo'}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-primary shadow-sm outline-none transition-all cursor-pointer ${
                            STATUS_OPTIONS.find(opt => opt.label === (lead.status || 'Novo'))?.color || 'bg-slate-100'
                          }`}
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt.label} value={opt.label} className="bg-white text-slate-700 font-normal">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 min-w-[200px]">
                        <textarea 
                          placeholder="Adicionar nota..." 
                          defaultValue={lead.notes || ''}
                          onBlur={(e) => updateLeadNotes(lead.id, e.target.value)}
                          className="w-full h-12 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none shadow-inner"
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        {lead.whatsapp && (
                          <button 
                            onClick={() => handleWhatsappClick(lead)}
                            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white p-2.5 rounded-xl inline-flex items-center gap-2 transition-all shadow-sm hover:shadow-emerald-200"
                            title="Conversar no WhatsApp"
                          >
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-xs font-bold hidden xl:inline">Chat</span>
                          </button>
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

