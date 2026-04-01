import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lead, ColumnId } from '../types/crm';

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
