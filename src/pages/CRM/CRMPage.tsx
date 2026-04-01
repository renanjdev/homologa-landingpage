import { useState, useRef } from 'react';
import { useCRMStore } from './store/crmStore';
import type { Lead } from './types/crm';
import CRMHeader from './components/CRMHeader';
import KanbanBoard from './components/KanbanBoard';
import LeadModal from './components/LeadModal';

export default function CRMPage() {
  const { addLead, updateLead, deleteLead } = useCRMStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const closedAtRef = useRef(0);

  const handleNewLead = () => {
    setEditingLead(null);
    setIsModalOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    if (Date.now() - closedAtRef.current < 500) return;
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    closedAtRef.current = Date.now();
    setIsModalOpen(false);
    setEditingLead(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <CRMHeader onNewLead={handleNewLead} />
      <KanbanBoard onEditLead={handleEditLead} />
      <LeadModal
        isOpen={isModalOpen}
        lead={editingLead}
        onClose={handleCloseModal}
        onSave={addLead}
        onUpdate={updateLead}
        onDelete={deleteLead}
      />
    </div>
  );
}
