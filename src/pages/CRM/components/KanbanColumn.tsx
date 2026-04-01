import { useState } from 'react';
import type { Lead, Column } from '../types/crm';
import LeadCard from './LeadCard';

interface KanbanColumnProps {
  column: Column;
  leads: Lead[];
  onEditLead: (lead: Lead) => void;
  onDragStart: (e: React.DragEvent, leadId: string) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
}

export default function KanbanColumn({ column, leads, onEditLead, onDragStart, onDrop }: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDragOver(false);
    onDrop(e, column.id);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col min-w-[280px] w-[280px] bg-slate-100/80 rounded-2xl transition-colors ${
        isDragOver ? 'bg-primary/5 ring-2 ring-primary/30' : ''
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-bold text-slate-700">{column.label}</h3>
        <span className="flex items-center justify-center w-6 h-6 bg-slate-200 text-slate-600 rounded-full text-xs font-bold">
          {leads.length}
        </span>
      </div>

      <div className="flex-1 px-3 pb-3 space-y-2.5 overflow-y-auto max-h-[calc(100vh-200px)]">
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onEdit={onEditLead}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}
