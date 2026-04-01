# CRM Kanban MVP Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone CRM Kanban page at `/crm` for managing commercial leads through a sales pipeline, isolated from the existing landing page.

**Architecture:** Zustand store with persist middleware for state + localStorage. HTML5 native drag and drop. Lazy-loaded route in existing React Router setup. All CRM code lives in `src/pages/CRM/`.

**Tech Stack:** React 19, TypeScript, Zustand, Tailwind CSS v4, Motion (framer-motion), Lucide React, HTML5 Drag & Drop API.

**Spec:** `docs/superpowers/specs/2026-04-01-crm-kanban-design.md`

---

## Chunk 1: Foundation (Types, Store, Route)

### Task 1: Install Zustand

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install zustand**

Run: `npm install zustand`

- [ ] **Step 2: Verify installation**

Run: `npm ls zustand`
Expected: `zustand@5.x.x` listed

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add zustand dependency for CRM state management"
```

---

### Task 2: Create TypeScript Types

**Files:**
- Create: `src/pages/CRM/types/crm.ts`

- [ ] **Step 1: Create types file**

```typescript
export type Temperature = 'cold' | 'warm' | 'hot';

export type ColumnId =
  | 'new_lead'
  | 'message_sent'
  | 'replied'
  | 'light_interest'
  | 'strong_interest'
  | 'negotiation'
  | 'client';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  origin: string;
  observation: string;
  nextAction: string;
  temperature: Temperature;
  columnId: ColumnId;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: ColumnId;
  label: string;
}

export const COLUMNS: Column[] = [
  { id: 'new_lead', label: 'Novo Lead' },
  { id: 'message_sent', label: 'Mensagem Enviada' },
  { id: 'replied', label: 'Respondeu' },
  { id: 'light_interest', label: 'Interessado Leve' },
  { id: 'strong_interest', label: 'Interessado Forte' },
  { id: 'negotiation', label: 'Em Negociacao' },
  { id: 'client', label: 'Cliente' },
];

export const TEMPERATURE_CONFIG: Record<Temperature, { label: string; color: string; bgColor: string; borderColor: string }> = {
  cold: { label: 'Frio', color: 'text-slate-500', bgColor: 'bg-slate-100', borderColor: 'border-l-slate-300' },
  warm: { label: 'Morno', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-l-amber-400' },
  hot: { label: 'Quente', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-l-red-500' },
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to crm.ts

- [ ] **Step 3: Commit**

```bash
git add src/pages/CRM/types/crm.ts
git commit -m "feat(crm): add TypeScript types for leads, columns, and temperature"
```

---

### Task 3: Create Zustand Store

**Files:**
- Create: `src/pages/CRM/store/crmStore.ts`

- [ ] **Step 1: Create store file**

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lead, ColumnId, Temperature } from '../types/crm';

interface CRMStore {
  leads: Lead[];
  searchTerm: string;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLead: (id: string, data: Partial<Lead>) => void;
  moveLead: (id: string, toColumn: ColumnId) => void;
  deleteLead: (id: string) => void;
  setSearchTerm: (term: string) => void;
}

export const useCRMStore = create<CRMStore>()(
  persist(
    (set) => ({
      leads: [],
      searchTerm: '',

      addLead: (leadData) =>
        set((state) => ({
          leads: [
            ...state.leads,
            {
              ...leadData,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateLead: (id, data) =>
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id
              ? { ...lead, ...data, updatedAt: new Date().toISOString() }
              : lead
          ),
        })),

      moveLead: (id, toColumn) =>
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id
              ? { ...lead, columnId: toColumn, updatedAt: new Date().toISOString() }
              : lead
          ),
        })),

      deleteLead: (id) =>
        set((state) => ({
          leads: state.leads.filter((lead) => lead.id !== id),
        })),

      setSearchTerm: (term) => set({ searchTerm: term }),
    }),
    {
      name: 'homologa-crm-leads',
    }
  )
);
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/CRM/store/crmStore.ts
git commit -m "feat(crm): add Zustand store with localStorage persistence"
```

---

### Task 4: Add Route to App.tsx

**Files:**
- Modify: `src/App.tsx` (lines 7-13 for import, line 42 for route)

- [ ] **Step 1: Add lazy import after line 13**

Add after the `Start` import:
```typescript
const CRMPage = lazy(() => import('./pages/CRM/CRMPage'));
```

- [ ] **Step 2: Add route after line 42 (after /obrigado route)**

```tsx
<Route path="/crm" element={<CRMPage />} />
```

- [ ] **Step 3: DO NOT commit yet** — CRMPage.tsx doesn't exist yet. Will commit after Task 5.

---

## Chunk 2: Core Components

### Task 5: Create CRMHeader Component

**Files:**
- Create: `src/pages/CRM/components/CRMHeader.tsx`

- [ ] **Step 1: Create the header component**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/CRM/components/CRMHeader.tsx
git commit -m "feat(crm): add CRMHeader component with search and new lead button"
```

---

### Task 6: Create LeadCard Component

**Files:**
- Create: `src/pages/CRM/components/LeadCard.tsx`

- [ ] **Step 1: Create the lead card component**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/CRM/components/LeadCard.tsx
git commit -m "feat(crm): add LeadCard component with drag support and temperature indicator"
```

---

### Task 7: Create LeadModal Component

**Files:**
- Create: `src/pages/CRM/components/LeadModal.tsx`

- [ ] **Step 1: Create the lead modal component**

```tsx
import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Lead, ColumnId, Temperature } from '../types/crm';
import { COLUMNS, TEMPERATURE_CONFIG } from '../types/crm';

interface LeadModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  onSave: (data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (id: string, data: Partial<Lead>) => void;
  onDelete: (id: string) => void;
}

export default function LeadModal({ isOpen, lead, onClose, onSave, onUpdate, onDelete }: LeadModalProps) {
  const isEditing = !!lead;

  const [name, setName] = useState(lead?.name ?? '');
  const [phone, setPhone] = useState(lead?.phone ?? '');
  const [origin, setOrigin] = useState(lead?.origin ?? '');
  const [observation, setObservation] = useState(lead?.observation ?? '');
  const [nextAction, setNextAction] = useState(lead?.nextAction ?? '');
  const [temperature, setTemperature] = useState<Temperature>(lead?.temperature ?? 'cold');
  const [columnId, setColumnId] = useState<ColumnId>(lead?.columnId ?? 'new_lead');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isEditing && lead) {
      onUpdate(lead.id, { name, phone, origin, observation, nextAction, temperature, columnId });
    } else {
      onSave({ name, phone, origin, observation, nextAction, temperature, columnId });
    }
    onClose();
  };

  const handleDelete = () => {
    if (lead) {
      onDelete(lead.id);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-display font-bold text-slate-900">
                {isEditing ? 'Editar Lead' : 'Novo Lead'}
              </h2>
              <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Nome *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome do lead"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Telefone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Origem</label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Instagram, Google, Indicacao..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Observacao</label>
                <textarea
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  placeholder="Notas sobre o lead..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Proxima Acao</label>
                <input
                  type="text"
                  value={nextAction}
                  onChange={(e) => setNextAction(e.target.value)}
                  placeholder="Ligar amanha, Enviar proposta..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Temperatura</label>
                  <select
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value as Temperature)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    {Object.entries(TEMPERATURE_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Coluna</label>
                  <select
                    value={columnId}
                    onChange={(e) => setColumnId(e.target.value as ColumnId)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    {COLUMNS.map((col) => (
                      <option key={col.id} value={col.id}>{col.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {isEditing ? (
                  <div>
                    {showDeleteConfirm ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-600">Confirmar exclusao?</span>
                        <button
                          type="button"
                          onClick={handleDelete}
                          className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Sim, excluir
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(false)}
                          className="text-xs text-slate-500 px-3 py-1.5 hover:text-slate-700 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Excluir
                      </button>
                    )}
                  </div>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-sm shadow-sm transition-all"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/CRM/components/LeadModal.tsx
git commit -m "feat(crm): add LeadModal component for creating and editing leads"
```

---

### Task 8: Create KanbanColumn Component

**Files:**
- Create: `src/pages/CRM/components/KanbanColumn.tsx`

- [ ] **Step 1: Create the kanban column component**

```tsx
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
        isDragOver ? 'bg-primary/5 ring-2 ring-primary/30 ring-dashed' : ''
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/CRM/components/KanbanColumn.tsx
git commit -m "feat(crm): add KanbanColumn component with drop zone support"
```

---

### Task 9: Create useDragAndDrop Hook

**Files:**
- Create: `src/pages/CRM/hooks/useDragAndDrop.ts`

- [ ] **Step 1: Create the drag and drop hook**

```typescript
import { useCallback } from 'react';
import type { ColumnId } from '../types/crm';

interface UseDragAndDropOptions {
  onMoveLead: (leadId: string, toColumn: ColumnId) => void;
}

export function useDragAndDrop({ onMoveLead }: UseDragAndDropOptions) {
  const handleDragStart = useCallback((e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('text/plain', leadId);
    e.dataTransfer.effectAllowed = 'move';
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (leadId) {
      onMoveLead(leadId, columnId as ColumnId);
    }
  }, [onMoveLead]);

  return { handleDragStart, handleDrop };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/CRM/hooks/useDragAndDrop.ts
git commit -m "feat(crm): add useDragAndDrop hook for HTML5 drag and drop"
```

---

## Chunk 3: Page Assembly and Route Integration

### Task 10: Create KanbanBoard Component

**Files:**
- Create: `src/pages/CRM/components/KanbanBoard.tsx`

- [ ] **Step 1: Create the kanban board component**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/CRM/components/KanbanBoard.tsx
git commit -m "feat(crm): add KanbanBoard component orchestrating columns and filtering"
```

---

### Task 11: Create CRMPage (Main Page)

**Files:**
- Create: `src/pages/CRM/CRMPage.tsx`

- [ ] **Step 1: Create the main CRM page**

```tsx
import { useState } from 'react';
import { useCRMStore } from './store/crmStore';
import type { Lead } from './types/crm';
import CRMHeader from './components/CRMHeader';
import KanbanBoard from './components/KanbanBoard';
import LeadModal from './components/LeadModal';

export default function CRMPage() {
  const { addLead, updateLead, deleteLead } = useCRMStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const handleNewLead = () => {
    setEditingLead(null);
    setIsModalOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors

- [ ] **Step 3: Commit CRMPage + App.tsx route change together**

```bash
git add src/pages/CRM/CRMPage.tsx src/App.tsx
git commit -m "feat(crm): add CRMPage and /crm route with lazy loading"
```

---

### Task 12: Build and Verify

- [ ] **Step 1: Run the dev server and verify /crm loads**

Run: `npm run dev`
Navigate to: `http://localhost:3000/crm`
Expected: CRM page loads with empty Kanban board, 7 columns visible

- [ ] **Step 2: Verify landing page still works**

Navigate to: `http://localhost:3000/`
Expected: Landing page loads normally, no changes

- [ ] **Step 3: Test creating a lead**

Click "Novo Lead", fill form, save. Card should appear in "Novo Lead" column.

- [ ] **Step 4: Test drag and drop**

Drag a card from one column to another. Card should move.

- [ ] **Step 5: Test edit and delete**

Click on a card, edit fields, save. Click card again, delete with confirmation.

- [ ] **Step 6: Test persistence**

Refresh the page. Leads should still be there (localStorage).

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat(crm): complete CRM Kanban MVP with drag-and-drop and localStorage persistence"
```
