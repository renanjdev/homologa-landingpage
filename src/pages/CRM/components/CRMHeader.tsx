import { Search, Plus, Users } from 'lucide-react';
import { useCRMStore } from '../store/crmStore';

interface CRMHeaderProps {
  onNewLead: () => void;
}

export default function CRMHeader({ onNewLead }: CRMHeaderProps) {
  const { leads, searchTerm, setSearchTerm } = useCRMStore();

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-display font-bold text-slate-900">CRM</h1>
          <span className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            <Users className="w-4 h-4" />
            {leads.length} leads
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
          <button
            onClick={onNewLead}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-sm transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Novo Lead
          </button>
        </div>
      </div>
    </header>
  );
}
