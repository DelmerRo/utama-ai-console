import React from 'react';
import { Loader2 } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useProductAnalysis } from '../../hooks/useProductAnalysis';
import { UploadBox } from '../ui/UploadBox';
import { ModelSelector } from '../ui/ModelSelector';
import { NumericInputGroup } from '../ui/NumericInputGroup';

export const InputColumn = () => {
  const { input, setInputField, isAnalyzing } = useProductStore();
  const { selectedModel, setSelectedModel, handleEnrich } = useProductAnalysis();

  const handleImageSelected = (file: File) => {
    setInputField('imageFile', file);
    const previewUrl = URL.createObjectURL(file);
    setInputField('imagePreview', previewUrl);
  };

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

      {/* Componente Reutilizable: Upload Box */}
      <UploadBox 
        imagePreview={input.imagePreview} 
        onImageSelected={handleImageSelected} 
      />

      {/* Formulario */}
      <div className="flex flex-col gap-4">
        {/* Componente Reutilizable: Selector de Modelo */}
        <ModelSelector 
          selectedModel={selectedModel} 
          onSelectModel={setSelectedModel} 
          disabled={isAnalyzing} 
        />

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

        {/* Componente Reutilizable: Inputs Numéricos */}
        <NumericInputGroup 
          width={input.width}
          depth={input.depth}
          height={input.height}
          weight={input.weight}
          onChange={handleNumericChange}
        />

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