import React from 'react';
import type { SectionProps } from '../contrato/types';

export default function Demonstracao({ label }: SectionProps) {
  return <div className="fable-placeholder">01 · {label}</div>;
}
