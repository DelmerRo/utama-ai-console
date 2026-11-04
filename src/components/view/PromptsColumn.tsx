// src/components/PromptsColumn.tsx
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';

interface PromptCardProps {
  title: string;
  badge: string;
  desc: string;
  content: string;
  isSpecial?: boolean;
}

const PromptCard: React.FC<PromptCardProps> = ({ title, badge, desc, content, isSpecial }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all"
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

export const PromptsColumn = () => {
  const { prompts } = useProductStore();

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
          content={prompts.portada} 
        />
        <PromptCard 
          title="2. Contexto de Uso" 
          badge="Foto 2/3" 
          desc="Inundación lumínica difusa simulando ventana limpia para evitar sombras negras." 
          content={prompts.contexto} 
        />
        <PromptCard 
          title="3. Detalle Macro" 
          badge="Foto 4" 
          desc="Luz rasante enfocada en capturar el relieve orgánico y las texturas del material." 
          content={prompts.detalle} 
        />
        <PromptCard 
          title="4. Catálogo de Ventas" 
          badge="Gancho" 
          desc="Juego limpio de luces y sombras arquitectónicas minimalistas. Eleva el valor percibido." 
          content={prompts.ventas} 
        />
        <PromptCard 
          title="5. Escala y Proporción Real" 
          badge="Foto 5" 
          desc="Anclaje espacial con manos humanas u objetos cotidianos (lente 50mm) para que el cliente dimensione el tamaño exacto." 
          content={prompts.escala} 
        />
        <PromptCard 
          title="6. Infografía de Medidas" 
          badge="Infografía" 
          desc="Lienzo limpio con espacio negativo idóneo para incorporar diagramas de cotas." 
          content={prompts.infografia} 
        />
        <PromptCard 
          title="7. Copy & SEO" 
          badge="Copywriting" 
          desc="Prompt avanzado de Neuromarketing. Copiá este texto y pégalo en Gemini/ChatGPT adjuntando la foto." 
          content={prompts.copywriting} 
          isSpecial={true}
        />
       <PromptCard 
          title="8. Historia de IG (Nuevo Ingreso)" 
          badge="Story 9:16" 
          desc="Storyboard de 3 placas (Video + Textos) respetando zonas seguras y sin encuestas." 
          content={prompts.historia} 
        />
        <PromptCard 
          title="9. Guion para Reel / TikTok" 
          badge="Video Script" 
          desc="Estructura de 15 segundos para animar desde la imagen de referencia con gancho visual y textos." 
          content={prompts.reel} 
          isSpecial={true}
        />
      </div>
    </div>
  );
};