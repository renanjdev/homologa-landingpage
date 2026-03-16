import React from 'react';
import { Search, Download, Calendar, Mail, Phone, MessageCircle, Users, TrendingUp } from 'lucide-react';
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

interface LeadsCrmProps {
  leads: Lead[];
  loading: boolean;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  search: string;
  setSearch: (s: string) => void;
  startDate: string;
  setStartDate: (s: string) => void;
  endDate: string;
  setEndDate: (s: string) => void;
  updateLeadStatus: (id: string, s: string) => void;
  updateLeadNotes: (id: string, s: string) => void;
  handleWhatsappClick: (l: Lead) => void;
}

const STATUS_OPTIONS = [
  { label: 'Novo', color: 'bg-blue-100 text-blue-700' },
  { label: 'Em Contato', color: 'bg-amber-100 text-amber-700' },
  { label: 'Convertido', color: 'bg-emerald-100 text-emerald-700' },
  { label: 'Perdido', color: 'bg-slate-100 text-slate-600' }
];

export default function LeadsCrm({
  leads,
  loading,
  statusFilter,
  setStatusFilter,
  search,
  setSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  updateLeadStatus,
  updateLeadNotes,
  handleWhatsappClick
}: LeadsCrmProps) {

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.email.toLowerCase().includes(search.toLowerCase()) || 
      (lead.name && lead.name.toLowerCase().includes(search.toLowerCase())) ||
      (lead.whatsapp && lead.whatsapp.includes(search));
    
    const matchesStatus = statusFilter === 'Todos' || lead.status === statusFilter || (!lead.status && statusFilter === 'Novo');
    
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads CRM Base");
    const wscols = [{wch: 10}, {wch: 30}, {wch: 40}, {wch: 20}, {wch: 20}, {wch: 20}, {wch: 40}, {wch: 25}];
    worksheet['!cols'] = wscols;
    XLSX.writeFile(workbook, `SaaS_CRM_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6">
      {/* Table Actions & Filters */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
          
          <div className="flex bg-slate-100 border border-slate-200 rounded-lg p-1 w-full xl:w-auto overflow-x-auto">
            <button 
              onClick={() => setStatusFilter('Todos')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md whitespace-nowrap transition-all ${statusFilter === 'Todos' ? 'bg-white shadow text-primary' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Todos
            </button>
            {STATUS_OPTIONS.map(opt => (
              <button 
                key={opt.label}
                onClick={() => setStatusFilter(opt.label)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md whitespace-nowrap transition-all ${statusFilter === opt.label ? 'bg-white shadow text-primary' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          
        </div>

        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-end flex-1">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar cliente, email, fone..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">Início</span>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">Fim</span>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              {(startDate || endDate) && (
                <button 
                  onClick={() => { setStartDate(''); setEndDate(''); }}
                  className="mt-6 text-xs text-rose-500 hover:text-rose-600 font-medium underline"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          <button 
            onClick={exportToExcel}
            disabled={leads.length === 0}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all disabled:opacity-50 w-full lg:w-auto mt-2 lg:mt-0"
          >
            <Download className="w-4 h-4" />
            Exportar XLS
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-slate-700 border-b border-slate-100 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Lead Tracker</th>
                <th className="px-6 py-4">Contato Oficial</th>
                <th className="px-6 py-4">Estágio (Funil)</th>
                <th className="px-6 py-4">Notas & Histórico</th>
                <th className="px-6 py-4 text-right">Ações CRM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    </div>
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                    Nenhum cliente CRM encontrado para os filtros ativos.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 max-w-[200px]">
                      <div className="font-semibold text-slate-900 flex items-center gap-2 text-[15px]">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="truncate">{lead.name || 'Projetista Lead'}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1.5 flex flex-wrap gap-2">
                        <span className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded">
                          <TrendingUp className="w-3 h-3" />
                          {lead.utm_source || 'Orgânico'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-2 text-slate-600">
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
                        placeholder="Log de calls, restrições, etc..." 
                        defaultValue={lead.notes || ''}
                        onBlur={(e) => updateLeadNotes(lead.id, e.target.value)}
                        className="w-full h-12 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-primary outline-none transition-all resize-none shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      {lead.whatsapp && (
                        <button 
                          onClick={() => handleWhatsappClick(lead)}
                          className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white p-2.5 lg:px-4 lg:py-2 rounded-xl inline-flex items-center gap-2 transition-all shadow-sm hover:shadow-emerald-200"
                          title="Conversar no WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs font-bold hidden lg:inline">Whatsapp</span>
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
  );
}
