// src/components/EnrichmentColumn.tsx
import React from 'react';
import { useProductStore } from '../store/useProductStore';
import { VisualStyle } from '../types';

const STYLE_OPTIONS: VisualStyle[] = [
  "Nórdico", "Escandinavo", "Japandi", "Scandi-Japandi", "Wabi-Sabi",
  "Minimalista Orgánico", "Moderno", "Rústico", "Industrial",
  "Mediterráneo Cálido", "Clásico"
];

export const EnrichmentColumn = () => {
  const { enrichment, setEnrichmentField } = useProductStore();

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-[#d4a373] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</div>
        <h2 className="text-lg font-semibold text-gray-800">Enriquecimiento</h2>
      </div>

      <div className="flex flex-col gap-5 overflow-y-auto pr-2 pb-4">
        
        {/* RAMA COMERCIAL */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Rama Comercial</h3>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nombre comercial</label>
              <input 
                type="text" 
                value={enrichment.nombreComercial}
                onChange={(e) => setEnrichmentField('nombreComercial', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2a9d8f]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Argumentos de venta</label>
              <textarea 
                rows={4}
                value={enrichment.argumentosVenta}
                onChange={(e) => setEnrichmentField('argumentosVenta', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] resize-none"
              />
            </div>
          </div>
        </div>

        {/* DIRECCIÓN DE ARTE */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Dirección de Arte</h3>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Material (detectado)</label>
              <textarea 
                rows={2}
                value={enrichment.materialDetectado}
                onChange={(e) => setEnrichmentField('materialDetectado', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] resize-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Estilo visual</label>
              <select 
                value={enrichment.estiloVisual}
                onChange={(e) => setEnrichmentField('estiloVisual', e.target.value as VisualStyle)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2a9d8f]"
              >
                <option value="" disabled>Seleccioná un estilo...</option>
                {STYLE_OPTIONS.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Contexto sugerido</label>
              <textarea 
                rows={2}
                value={enrichment.contextoSugerido}
                onChange={(e) => setEnrichmentField('contextoSugerido', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Feature principal (Macro)</label>
              <input 
                type="text" 
                value={enrichment.featurePrincipal}
                onChange={(e) => setEnrichmentField('featurePrincipal', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2a9d8f]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Componentes visibles (props)</label>
              <input 
                type="text" 
                value={enrichment.componentesVisibles}
                onChange={(e) => setEnrichmentField('componentesVisibles', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2a9d8f]"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};