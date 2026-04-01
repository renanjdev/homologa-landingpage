import { useCRMStore } from '../store/crmStore';
import { COLUMNS } from '../types/crm';
import type { Lead } from '../types/crm';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  onEditLead: (lead: Lead) => void;
}

export default function KanbanBoard({ onEditLead }: KanbanBoardProps) {
  const { leads, searchTerm, moveLead } = useCRMStore();
  const { handleDragStart, handleDrop } = useDragAndDrop({ onMoveLead: moveLead });

  const filteredLeads = leads.filter((lead) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      lead.name.toLowerCase().includes(term) ||
      lead.phone.includes(term)
    );
  });

  return (
    <div className="flex-1 overflow-x-auto p-4 sm:p-6">
      <div className="flex gap-4">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            leads={filteredLeads.filter((lead) => lead.columnId === column.id)}
            onEditLead={onEditLead}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
}
