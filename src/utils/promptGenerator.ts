import { ProductInput, EnrichmentData, PromptsData } from '../types';
import { buildPromptContext, promptBuilders } from '../domain/promptStrategies';

export const generatePrompts = (input: ProductInput, enrichment: EnrichmentData): PromptsData => {
  const ctx = buildPromptContext(input, enrichment);

  return {
    portada: promptBuilders.portada(ctx),
    contexto: promptBuilders.contexto(ctx),
    detalle: promptBuilders.detalle(ctx),
    ventas: promptBuilders.ventas(ctx),
    infografia: promptBuilders.infografia(ctx),
    copywriting: promptBuilders.copywriting(ctx),
    escala: promptBuilders.escala(ctx),
    historia: promptBuilders.historia(ctx), 
    reel: promptBuilders.reel(ctx),
    meliVideo: promptBuilders.meliVideo(ctx),
    reelsUgc: promptBuilders.reelsUgc(ctx),
    storiesSecuencia: promptBuilders.storiesSecuencia(ctx)
  };
};