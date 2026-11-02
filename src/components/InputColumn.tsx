// src/components/InputColumn.tsx
import React, { useRef, useState } from 'react';
import { UploadCloud, Loader2, Cpu } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import { analyzeProductWithAI } from '../api/gemini';

const MODEL_OPTIONS = [
  { id: 'gemini-3.6-flash', name: '3.6 Flash (Ayuda completa)' },
  { id: 'gemini-3.5-flash-lite', name: '3.5 Flash-Lite (Respuestas rápidas)' },
  { id: 'gemini-3.1-pro-preview', name: '3.1 Pro (Razonamiento avanzado)' },
];

export const InputColumn = () => {
  const { input, setInputField, setEnrichmentData, isAnalyzing, setIsAnalyzing } = useProductStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estado local para almacenar el modelo seleccionado
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.6-flash');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInputField('imageFile', file);
      const previewUrl = URL.createObjectURL(file);
      setInputField('imagePreview', previewUrl);
    }
  };

  const handleEnrich = async () => {
    if (!input.imageFile || !input.name) {
      alert("Por favor, subí una foto y agregá al menos un nombre provisional.");
      return;
    }
    
    setIsAnalyzing(true);
    try {
      const enrichedData = await analyzeProductWithAI(input, selectedModel);
      setEnrichmentData(enrichedData);
    } catch (error: any) {
      alert(error?.message || "Hubo un error al analizar la imagen. Revisá la consola para más detalles.");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handler seguro para inputs numéricos decimales (permite escribir 0.2, 0.9, etc.)
  const handleNumericChange = (field: 'width' | 'depth' | 'height' | 'weight', value: string) => {
    if (value === '') {
      setInputField(field, '');
      return;
    }
    const parsed = parseFloat(value);
    setInputField(field, isNaN(parsed) ? '' : parsed);
  };

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-[#d4a373] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</div>
        <h2 className="text-lg font-semibold text-gray-800">Input</h2>
      </div>

      {/* Upload Box */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-48 relative overflow-hidden"
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />
        {input.imagePreview ? (
          <img src={input.imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <>
            <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500 font-medium">Arrastrá o elegí una foto</span>
          </>
        )}
      </div>

      {/* Formulario */}
      <div className="flex flex-col gap-4">
        {/* Selector de Modelo Gemini */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-[#d4a373]" /> Modelo de IA
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={isAnalyzing}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4a373] disabled:opacity-50 font-medium cursor-pointer"
          >
            {MODEL_OPTIONS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Nombre provisional</label>
          <input 
            type="text" 
            placeholder="Ej: Set x6 frascos" 
            value={input.name}
            onChange={(e) => setInputField('name', e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Material base</label>
          <input 
            type="text" 
            value={input.material}
            onChange={(e) => setInputField('material', e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
          />
        </div>

        {/* Inputs numéricos con step="any" para permitir cualquier decimal */}
        <div className="grid grid-cols-4 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Ancho</label>
            <input 
              type="number" 
              step="any"
              placeholder="0.0"
              value={input.width ?? ''} 
              onChange={(e) => handleNumericChange('width', e.target.value)} 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373]" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Prof.</label>
            <input 
              type="number" 
              step="any"
              placeholder="0.0"
              value={input.depth ?? ''} 
              onChange={(e) => handleNumericChange('depth', e.target.value)} 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373]" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Alto</label>
            <input 
              type="number" 
              step="any"
              placeholder="0.0"
              value={input.height ?? ''} 
              onChange={(e) => handleNumericChange('height', e.target.value)} 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373]" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Kg</label>
            <input 
              type="number" 
              step="any"
              placeholder="0.0"
              value={input.weight ?? ''} 
              onChange={(e) => handleNumericChange('weight', e.target.value)} 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373]" 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Descripción técnica y despiece</label>
          <textarea 
            rows={3}
            placeholder="Ej: 6 frascos de 250 ml, tapa de bambú..."
            value={input.description}
            onChange={(e) => setInputField('description', e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373] resize-none"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-3 flex items-start gap-1">
          <span className="text-[#d4a373]">⚠️</span> Este dato solo alimenta el copy de venta y la estructura del prompt. Nunca llega a los píxeles.
        </p>
        <button 
          onClick={handleEnrich}
          disabled={isAnalyzing || !input.imageFile}
          className="w-full bg-[#d4a373] hover:bg-[#c39162] text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : '✨ Enriquecer con IA'}
        </button>
      </div>
    </div>
  );
};