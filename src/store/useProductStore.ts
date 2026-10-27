// src/store/useProductStore.ts
import { create } from 'zustand';
import { ProductInput, EnrichmentData, PromptsData } from '../types';
import { generatePrompts } from '../utils/promptGenerator';

interface ProductState {
  input: ProductInput;
  enrichment: EnrichmentData;
  prompts: PromptsData;
  isAnalyzing: boolean;
  
  // Acciones
  setInputField: (field: keyof ProductInput, value: any) => void;
  setEnrichmentField: (field: keyof EnrichmentData, value: string) => void;
  setEnrichmentData: (data: EnrichmentData) => void;
  setIsAnalyzing: (status: boolean) => void;
  updatePrompts: () => void;
}

const initialInput: ProductInput = {
  name: "",
  material: "",
  width: 0,
  depth: 0,
  height: 0,
  weight: 0,
  description: "",
  imagePreview: null,
  imageFile: null
};

const initialEnrichment: EnrichmentData = {
  nombreComercial: "",
  argumentosVenta: "",
  materialDetectado: "",
  estiloVisual: "",
  contextoSugerido: "",
  featurePrincipal: "",
  componentesVisibles: ""
};

const initialPrompts: PromptsData = {
  portada: "", contexto: "", detalle: "", ventas: "", infografia: "", copywriting: ""
};

export const useProductStore = create<ProductState>((set, get) => ({
  input: initialInput,
  enrichment: initialEnrichment,
  prompts: initialPrompts,
  isAnalyzing: false,

  setInputField: (field, value) => {
    set((state) => ({
      input: { ...state.input, [field]: value }
    }));
    get().updatePrompts();
  },

  setEnrichmentField: (field, value) => {
    set((state) => ({
      enrichment: { ...state.enrichment, [field]: value }
    }));
    get().updatePrompts();
  },

  setEnrichmentData: (data) => {
    set({ enrichment: data });
    get().updatePrompts();
  },

  setIsAnalyzing: (status) => set({ isAnalyzing: status }),

  updatePrompts: () => {
    const { input, enrichment } = get();
    const newPrompts = generatePrompts(input, enrichment);
    set({ prompts: newPrompts });
  }
}));