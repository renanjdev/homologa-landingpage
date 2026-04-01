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
  { id: 'negotiation', label: 'Em Negociação' },
  { id: 'client', label: 'Cliente' },
];

export const TEMPERATURE_CONFIG: Record<Temperature, { label: string; color: string; bgColor: string; borderColor: string }> = {
  cold: { label: 'Frio', color: 'text-slate-500', bgColor: 'bg-slate-100', borderColor: 'border-l-slate-300' },
  warm: { label: 'Morno', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-l-amber-400' },
  hot: { label: 'Quente', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-l-red-500' },
};
