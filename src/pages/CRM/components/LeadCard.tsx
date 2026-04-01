import { Phone, ArrowRight, GripVertical } from 'lucide-react';
import type { Lead } from '../types/crm';
import { TEMPERATURE_CONFIG } from '../types/crm';

interface LeadCardProps {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDragStart: (e: React.DragEvent, leadId: string) => void;
}

export default function LeadCard({ lead, onEdit, onDragStart }: LeadCardProps) {
  const tempConfig = TEMPERATURE_CONFIG[lead.temperature];

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      onDragEnd={(e) => { if (e.currentTarget instanceof HTMLElement) e.currentTarget.style.opacity = '1'; }}
      onClick={() => onEdit(lead)}
      className={`bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 border-l-4 ${tempConfig.borderColor} p-3 cursor-grab active:cursor-grabbing transition-all hover:scale-[1.02] select-none`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 text-sm truncate">{lead.name}</p>
          {lead.phone && (
            <p className="flex items-center gap-1 text-xs text-slate-500 mt-1">
              <Phone className="w-3 h-3" />
              {lead.phone}
            </p>
          )}
        </div>
        <GripVertical className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
      </div>

      {lead.nextAction && (
        <div className="flex items-center gap-1 mt-2 text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
          <ArrowRight className="w-3 h-3 text-primary" />
          <span className="truncate">{lead.nextAction}</span>
        </div>
      )}

      <div className="mt-2">
        <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${tempConfig.bgColor} ${tempConfig.color}`}>
          {tempConfig.label}
        </span>
      </div>
    </div>
  );
}
