import React from 'react';
import { Cpu } from 'lucide-react';
import { SUPPORTED_MODELS } from '../../config/models';

interface ModelSelectorProps {
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  disabled?: boolean;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onSelectModel,
  disabled = false,
}) => {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
        <Cpu className="w-3.5 h-3.5 text-[#d4a373]" /> Modelo de IA
      </label>
      <select
        value={selectedModel}
        onChange={(e) => onSelectModel(e.target.value)}
        disabled={disabled}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4a373] disabled:opacity-50 font-medium cursor-pointer"
      >
        {SUPPORTED_MODELS.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};