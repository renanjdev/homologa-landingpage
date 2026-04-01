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
