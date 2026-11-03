export interface AIModelOption {
  id: string;
  name: string;
}

export const SUPPORTED_MODELS: AIModelOption[] = [
  { id: 'gemini-3.6-flash', name: '3.6 Flash (Ayuda completa)' },
  { id: 'gemini-3.5-flash-lite', name: '3.5 Flash-Lite (Respuestas rápidas)' },
  { id: 'gemini-3.1-pro', name: '3.1 Pro (Razonamiento avanzado)' },
];

export const DEFAULT_MODEL_ID = 'gemini-3.6-flash';