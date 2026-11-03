import React from 'react';

interface NumericInputGroupProps {
  width: number | string;
  depth: number | string;
  height: number | string;
  weight: number | string;
  onChange: (field: 'width' | 'depth' | 'height' | 'weight', value: string) => void;
}

export const NumericInputGroup: React.FC<NumericInputGroupProps> = ({
  width,
  depth,
  height,
  weight,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Ancho</label>
        <input
          type="number"
          step="any"
          placeholder="0.0"
          value={width ?? ''}
          onChange={(e) => onChange('width', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Prof.</label>
        <input
          type="number"
          step="any"
          placeholder="0.0"
          value={depth ?? ''}
          onChange={(e) => onChange('depth', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Alto</label>
        <input
          type="number"
          step="any"
          placeholder="0.0"
          value={height ?? ''}
          onChange={(e) => onChange('height', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Kg</label>
        <input
          type="number"
          step="any"
          placeholder="0.0"
          value={weight ?? ''}
          onChange={(e) => onChange('weight', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
        />
      </div>
    </div>
  );
};