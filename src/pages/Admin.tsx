import React, { useState, useEffect } from 'react';
import { Shield, Users, Mail, Phone, Calendar, Search, Download, MessageCircle } from 'lucide-react';
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Hardcoded credentials check client side as first layer, before firing request
    if (email === 'admin@homologaplus.com.br' && password === '7698398*Re') {
      setIsAuthenticated(true);
      await fetchLeads();
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
    setLoading(false);
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

  const filteredLeads = leads.filter(lead => 
    lead.email.toLowerCase().includes(search.toLowerCase()) || 
    (lead.name && lead.name.toLowerCase().includes(search.toLowerCase())) ||
    (lead.whatsapp && lead.whatsapp.includes(search))
  );

  const exportToExcel = () => {
    // Transform leads to a format suitable for Excel
    const dataToExport = filteredLeads.map((lead, index) => ({
      'Posição Inicial (Estimado)': index + 1, // Optional: gives an idea of queue assuming ordered
      'Nome': lead.name || 'Não informado',
      'Email': lead.email,
      'WhatsApp': lead.whatsapp || 'Não informado',
      'Origem (UTM Source)': lead.utm_source || 'Orgânico',
      'Data de Cadastro': new Date(lead.created_at).toLocaleString('pt-BR')
    }));

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads Waitlist");

    // Auto-size columns (basic estimation)
    const wscols = [
      {wch: 25}, // Posição
      {wch: 30}, // Nome
      {wch: 40}, // Email
      {wch: 20}, // WhatsApp
      {wch: 20}, // Origem
      {wch: 25}  // Data
    ];
    worksheet['!cols'] = wscols;

    // Generate buffer and trigger download
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
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Público</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Senha de Acesso</label>
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
              Painel Administrativo
            </h1>
            <p className="text-slate-500 text-sm mt-1">Gerenciamento de leads capturados na lista de espera.</p>
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
              onClick={exportToExcel}
              disabled={leads.length === 0}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar Planilha</span>
            </button>
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap hidden sm:block">
              Total: {leads.length}
            </div>
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
                  <th className="px-6 py-4 font-semibold">Origem</th>
                  <th className="px-6 py-4 font-semibold">Data de Cadastro</th>
                  <th className="px-6 py-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
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
                          {lead.name || 'Projetista Anônimo'}
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
                          {lead.utm_source || 'Orgânico'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {new Date(lead.created_at).toLocaleDateString('pt-BR', {
                            day: '2-digit', month: '2-digit', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {lead.whatsapp && (
                          <a 
                            href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${lead.name || 'Projetista'}, vi que você se inscreveu na lista de espera do HOMOLOGA Plus! Tudo bem?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium transition-colors"
                            title="Chamar no WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </a>
                        )}
                        {!lead.whatsapp && <span className="text-slate-300 text-sm">Sem nº</span>}
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
