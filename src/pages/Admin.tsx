import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Settings, LogOut, Shield, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AdminLogin from '../components/admin/AdminLogin';
import DashboardOverview from '../components/admin/DashboardOverview';
import LeadsCrm from '../components/admin/LeadsCrm';

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

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Data States
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Filter States
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  useEffect(() => {
    const session = localStorage.getItem('homologa_admin_session');
    if (session === 'active') {
      setIsAuthenticated(true);
      fetchLeads();
    }
  }, []);

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
        headers: { 'Authorization': `Basic ${b64Token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        setError('Erro ao buscar leads da API.');
      }
    } catch (err) {
      setError('Falha de conexão.');
    }
    setLoading(false);
  };

  const updateLeadStatus = async (id: string, newStatus: string) => {
    const oldLeads = [...leads];
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    try {
      const b64Token = btoa('admin@homologaplus.com.br:7698398*Re');
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${b64Token}` },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (!res.ok) throw new Error('API Error');
    } catch (err: any) {
      setLeads(oldLeads);
      alert('Erro ao atualizar status');
    }
  };

  const updateLeadNotes = async (id: string, newNotes: string) => {
    try {
      const b64Token = btoa('admin@homologaplus.com.br:7698398*Re');
      await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${b64Token}` },
        body: JSON.stringify({ id, notes: newNotes })
      });
      setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: newNotes } : l));
    } catch (err) {
      console.error(err);
    }
  };

  const handleWhatsappClick = (lead: Lead) => {
    if (lead.status === 'Novo' || !lead.status) {
      updateLeadStatus(lead.id, 'Em Contato');
    }
    const phone = lead.whatsapp?.replace(/\D/g, '');
    const text = `Olá ${lead.name || 'Projetista'}, vi que se inscreveu no HOMOLOGA Plus! Tudo bem?`;
    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={(status) => {
      setIsAuthenticated(status);
      if (status) fetchLeads();
    }} />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'crm', label: 'Leads CRM', icon: <Users className="w-5 h-5" /> },
    { id: 'settings', label: 'Configurações', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Desktop & Mobile Overlay */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth > 1024) && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm"
            />
            {/* Sidebar Pane */}
            <motion.aside 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed lg:sticky top-0 left-0 h-screen w-[280px] bg-white border-r border-slate-200 z-50 flex flex-col"
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-white p-2 rounded-xl shadow-inner">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="font-display font-bold text-slate-900 leading-tight">Painel Admin</h1>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">SaaS Edition</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 px-4 py-6 space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Menu Principal</div>
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === item.id 
                        ? 'bg-primary/10 text-primary shadow-sm' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-slate-100">
                <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-200/50 mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-700 flex items-center justify-center font-bold">
                    HQ
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">Admin</p>
                    <p className="text-xs text-slate-500 truncate">admin@homologaplus.com.br</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 text-rose-600 hover:bg-rose-50 py-3 rounded-xl font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair do Sístema
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 capitalize px-2 lg:px-0">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sistemas Operacionais
            </div>
          </div>
        </header>

        {/* Tab Content Wrappers */}
        <div className="p-4 md:p-8 max-w-[1600px] w-full mx-auto">
          {error && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3">
              <Shield className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <DashboardOverview leads={leads} />}
              {activeTab === 'crm' && (
                <LeadsCrm 
                  leads={leads}
                  loading={loading}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  search={search}
                  setSearch={setSearch}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  updateLeadStatus={updateLeadStatus}
                  updateLeadNotes={updateLeadNotes}
                  handleWhatsappClick={handleWhatsappClick}
                />
              )}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center py-20">
                  <Settings className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Configurações Avançadas</h3>
                  <p className="text-slate-500">Esta área estará disponível na próxima atualização do sistema.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
