import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';

interface UploadBoxProps {
  imagePreview: string | null;
  onImageSelected: (file: File) => void;
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  imagePreview,
  onImageSelected,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-48 relative overflow-hidden"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Preview"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500 font-medium">
            Arrastrá o elegí una foto
          </span>
        </>
      )}
    </div>
  );
};