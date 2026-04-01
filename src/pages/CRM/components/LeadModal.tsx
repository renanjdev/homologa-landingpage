import { useState, useEffect } from 'react';
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

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [origin, setOrigin] = useState('');
  const [observation, setObservation] = useState('');
  const [nextAction, setNextAction] = useState('');
  const [temperature, setTemperature] = useState<Temperature>('cold');
  const [columnId, setColumnId] = useState<ColumnId>('new_lead');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(lead?.name ?? '');
      setPhone(lead?.phone ?? '');
      setOrigin(lead?.origin ?? '');
      setObservation(lead?.observation ?? '');
      setNextAction(lead?.nextAction ?? '');
      setTemperature(lead?.temperature ?? 'cold');
      setColumnId(lead?.columnId ?? 'new_lead');
      setShowDeleteConfirm(false);
    }
  }, [isOpen, lead]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!name.trim()) return;

    if (isEditing && lead) {
      onUpdate(lead.id, { name, phone, origin, observation, nextAction, temperature, columnId });
    } else {
      onSave({ name, phone, origin, observation, nextAction, temperature, columnId });
    }
    setTimeout(onClose, 0);
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
                  placeholder="Instagram, Google, Indicação..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Observação</label>
                <textarea
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  placeholder="Notas sobre o lead..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Próxima Ação</label>
                <input
                  type="text"
                  value={nextAction}
                  onChange={(e) => setNextAction(e.target.value)}
                  placeholder="Ligar amanhã, Enviar proposta..."
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
                        <span className="text-xs text-red-600">Confirmar exclusão?</span>
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
