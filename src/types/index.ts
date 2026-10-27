// src/types/index.ts

export type VisualStyle = 
  | "Nórdico"
  | "Escandinavo"
  | "Japandi"
  | "Scandi-Japandi"
  | "Wabi-Sabi"
  | "Minimalista Orgánico"
  | "Moderno"
  | "Rústico"
  | "Industrial"
  | "Mediterráneo Cálido"
  | "Clásico";

export interface ProductInput {
  name: string;
  material: string;
  width: number;
  depth: number;
  height: number;
  weight: number;
  description: string;
  imagePreview: string | null;
  imageFile: File | null;
}

export interface EnrichmentData {
  nombreComercial: string;
  argumentosVenta: string;
  materialDetectado: string;
  estiloVisual: VisualStyle | "";
  contextoSugerido: string;
  featurePrincipal: string;
  componentesVisibles: string;
}

export interface PromptsData {
  portada: string;
  contexto: string;
  detalle: string;
  ventas: string;
  infografia: string;
  copywriting: string;
}