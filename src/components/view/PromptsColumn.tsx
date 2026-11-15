// src/components/PromptsColumn.tsx
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';

interface PromptCardProps {
  title: string;
  badge: string;
  desc: string;
  content?: string;
  isSpecial?: boolean;
}

const PromptCard: React.FC<PromptCardProps> = ({ title, badge, desc, content, isSpecial }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('No se pudo copiar el texto:', error);
    }
  };

  return (
    <div className={`flex flex-col gap-3 p-5 rounded-xl border ${isSpecial ? 'border-[#d4a373] bg-[#fffaf5]' : 'border-gray-200 bg-gray-50'}`}>
      <div className="flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-bold text-gray-800">{title}</h4>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${isSpecial ? 'bg-[#2a9d8f] text-white' : 'bg-gray-200 text-gray-600'}`}>
              {badge}
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
        </div>
        <button
          onClick={handleCopy}
          disabled={!content}
          className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <div className="relative group">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 rounded-l-md group-hover:bg-[#d4a373] transition-colors"></div>
        <pre className="text-[11px] text-gray-700 bg-white border border-gray-200 rounded-md p-3 pl-4 overflow-x-auto whitespace-pre-wrap font-mono max-h-40 overflow-y-auto">
          {content || "Completá los datos y hacé clic en 'Enriquecer con IA' para generar este prompt."}
        </pre>
      </div>
    </div>
  );
};

interface CarouselSlideCardProps {
  title: string;
  badge: string;
  desc: string;
  overlayText?: string;
  imagePrompt?: string;
}

const CarouselSlideCard: React.FC<CarouselSlideCardProps> = ({
  title,
  badge,
  desc,
  overlayText,
  imagePrompt,
}) => {
  const [copiedField, setCopiedField] = useState<'all' | 'overlay' | 'prompt' | null>(null);

  const fullContent =
    overlayText || imagePrompt
      ? `--- ✍️ TEXTO PARA PONER ARRIBA DE LA FOTO ---\n${overlayText || ''}\n\n--- 🎨 PROMPT DE IMAGEN (VERTICAL 4:5) ---\n${imagePrompt || ''}`
      : '';

  const handleCopy = async (text: string | undefined, field: 'all' | 'overlay' | 'prompt') => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error('No se pudo copiar el texto:', error);
    }
  };

  return (
    <div className="flex flex-col gap-3.5 p-5 rounded-xl border border-[#d4a373] bg-[#fffaf5]">
      {/* Encabezado de la Card + Botón Copiar Todo */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="text-sm font-bold text-gray-800">{title}</h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#2a9d8f] text-white">
              {badge}
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
        </div>
        <button
          onClick={() => handleCopy(fullContent, 'all')}
          disabled={!fullContent}
          className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {copiedField === 'all' ? (
            <Check className="w-3.5 h-3.5 text-green-600" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {copiedField === 'all' ? 'Todo copiado' : 'Copiar todo'}
        </button>
      </div>

      {/* Bloque 1: Texto sobre la foto */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-semibold text-gray-700">
            ✍️ Texto para poner arriba de la foto
          </span>
          <button
            onClick={() => handleCopy(overlayText, 'overlay')}
            disabled={!overlayText}
            className="flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-white border border-gray-200 px-2.5 py-1 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copiedField === 'overlay' ? (
              <Check className="w-3 h-3 text-green-600" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {copiedField === 'overlay' ? 'Copiado' : 'Copiar texto'}
          </button>
        </div>
        <div className="relative group">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2a9d8f]/60 rounded-l-md group-hover:bg-[#2a9d8f] transition-colors"></div>
          <pre className="text-[11px] text-gray-700 bg-white border border-gray-200 rounded-md p-2.5 pl-4 overflow-x-auto whitespace-pre-wrap font-mono max-h-28 overflow-y-auto">
            {overlayText || "Sin texto generado aún."}
          </pre>
        </div>
      </div>

      {/* Bloque 2: Prompt de imagen */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-semibold text-gray-700">
            🎨 Prompt de imagen (Vertical 4:5)
          </span>
          <button
            onClick={() => handleCopy(imagePrompt, 'prompt')}
            disabled={!imagePrompt}
            className="flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-white border border-gray-200 px-2.5 py-1 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copiedField === 'prompt' ? (
              <Check className="w-3 h-3 text-green-600" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {copiedField === 'prompt' ? 'Copiado' : 'Copiar prompt'}
          </button>
        </div>
        <div className="relative group">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 rounded-l-md group-hover:bg-[#d4a373] transition-colors"></div>
          <pre className="text-[11px] text-gray-700 bg-white border border-gray-200 rounded-md p-2.5 pl-4 overflow-x-auto whitespace-pre-wrap font-mono max-h-36 overflow-y-auto">
            {imagePrompt || "Sin prompt de imagen generado aún."}
          </pre>
        </div>
      </div>
    </div>
  );
};

export const PromptsColumn = () => {
  const { prompts } = useProductStore();
  const carruselList = Array.isArray(prompts?.carruselPrompts) ? prompts.carruselPrompts : [];

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-[#d4a373] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</div>
        <h2 className="text-lg font-semibold text-gray-800">Entregables</h2>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-4">
        <PromptCard
          title="1. Portada Héroe (CTR)"
          badge="Foto 1"
          desc="Resalta el volumen físico con iluminación de contorno lateral para despegarlo del fondo."
          content={prompts?.portada}
        />
        <PromptCard
          title="2. Contexto de Uso"
          badge="Foto 2/3"
          desc="Inundación lumínica difusa simulando ventana limpia para evitar sombras negras."
          content={prompts?.contexto}
        />
        <PromptCard
          title="3. Detalle Macro"
          badge="Foto 4"
          desc="Luz rasante enfocada en capturar el relieve orgánico y las texturas del material."
          content={prompts?.detalle}
        />
        <PromptCard
          title="4. Catálogo de Ventas"
          badge="Gancho"
          desc="Juego limpio de luces y sombras arquitectónicas minimalistas. Eleva el valor percibido."
          content={prompts?.ventas}
        />
        <PromptCard
          title="5. Escala y Proporción Real"
          badge="Foto 5"
          desc="Anclaje espacial con manos humanas u objetos cotidianos (lente 50mm) para que el cliente dimensione el tamaño exacto."
          content={prompts?.escala}
        />
        <PromptCard
          title="6. Infografía de Medidas"
          badge="Infografía"
          desc="Lienzo limpio con espacio negativo idóneo para incorporar diagramas de cotas."
          content={prompts?.infografia}
        />
        <PromptCard
          title="7. Copy & SEO"
          badge="Copywriting"
          desc="Prompt avanzado de Neuromarketing. Copiá este texto y pégalo en Gemini/ChatGPT adjuntando la foto."
          content={prompts?.copywriting}
          isSpecial={true}
        />
        <PromptCard
          title="8. Historia de IG (Nuevo Ingreso)"
          badge="Story 9:16"
          desc="Storyboard de 3 placas (Video + Textos) respetando zonas seguras y sin encuestas."
          content={prompts?.historia}
        />
        <PromptCard
          title="9. Guion para Reel / TikTok"
          badge="Video Script"
          desc="Estructura de 15 segundos para animar desde la imagen de referencia con gancho visual y textos."
          content={prompts?.reel}
          isSpecial={true}
        />
        <PromptCard
          title="10. Mercado Libre Videos (Sin CTA)"
          badge="ML Clips"
          desc="Guion técnico toma por toma (máx 3s) con SFX de tipeo y acción. Cumple 100% compliance de ML sin llamadas a la acción."
          content={prompts?.meliVideo}
          isSpecial={true}
        />
        <PromptCard
          title="11. Instagram Reels UGC"
          badge="Reel UGC"
          desc="Guion de 15s con problema/solución, SFX foley + tipeo, CTA interactivo para automaciones y Caption SEO."
          content={prompts?.reelsUgc}
          isSpecial={true}
        />
        <PromptCard
          title="12. Instagram Stories (Secuencia)"
          badge="Stories 9:16"
          desc="Secuencia paso a paso en tabla con stickers interactivos nativos (Encuestas/Sliders) y sticker de compra final."
          content={prompts?.storiesSecuencia}
          isSpecial={true}
        />

        {/* CARRUSEL NARRATIVO DINÁMICO (FEED VERTICAL 4:5) */}
        {carruselList.map((slide, index) => {
          const total = carruselList.length;

          return (
            <CarouselSlideCard
              key={`${slide.stepName}-${index}`}
              title={`13.${index + 1}. Carrusel Feed (${slide.stepName})`}
              badge={`Feed 4:5 • ${index + 1}/${total}`}
              desc={slide.interactionTip}
              overlayText={slide.overlayText}
              imagePrompt={slide.imagePrompt}
            />
          );
        })}
      </div>
    </div>
  );
};