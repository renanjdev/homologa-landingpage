import { useEffect, useState } from 'react';

export type MockTelemetry = {
  projectId: string;
  progress: number;
  documents: number;
  checks: number;
  activeStep: number;
};

const frames: MockTelemetry[] = [
  { projectId: 'HP-0427', progress: 18, documents: 2, checks: 11, activeStep: 0 },
  { projectId: 'HP-0427', progress: 41, documents: 5, checks: 28, activeStep: 1 },
  { projectId: 'HP-0427', progress: 68, documents: 7, checks: 44, activeStep: 2 },
  { projectId: 'HP-0427', progress: 92, documents: 9, checks: 61, activeStep: 3 },
  { projectId: 'HP-0427', progress: 100, documents: 9, checks: 68, activeStep: 4 },
];

/** Dados simulados para dar vida à demonstração visual. Não representam telemetria real de cliente. */
export function useMockTelemetry(): MockTelemetry {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setFrame((value) => (value + 1) % frames.length), 400);
    return () => window.clearInterval(timer);
  }, []);

  return frames[frame];
}

export const generatedDocuments = [
  'Memorial descritivo',
  'Diagrama unifilar',
  'Diagrama de blocos',
  'Planta de localização',
  'Formulários da distribuidora',
] as const;
