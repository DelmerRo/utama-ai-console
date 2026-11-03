import { ProductInput, EnrichmentData } from '../types';
import { DEFAULT_MODEL_ID } from '../config/models';

const compressImageAndToBase64 = (file: File): Promise<{ base64Data: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const MAX_DIMENSION = 1024;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIMENSION) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          }
        } else {
          if (height > MAX_DIMENSION) {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("No se pudo obtener el contexto 2D del canvas"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.80);
        const base64Data = dataUrl.split(',')[1];

        resolve({ base64Data, mimeType: 'image/jpeg' });
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
};

export const analyzeProductWithAI = async (
  input: ProductInput,
  selectedModel: string = DEFAULT_MODEL_ID
): Promise<EnrichmentData> => {
  if (!input.imageFile) {
    throw new Error("Se requiere una imagen para el análisis de IA.");
  }

  const { base64Data, mimeType } = await compressImageAndToBase64(input.imageFile);

  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      imageBase64: base64Data,
      mimeType,
      selectedModel,
      input: {
        name: input.name || '',
        material: input.material || '',
        width: input.width || '',
        depth: input.depth || '',
        height: input.height || '',
        weight: input.weight || '',
        description: input.description || ''
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.details || errorData.error || `Error en el servidor: ${response.status}`);
  }

  return (await response.json()) as EnrichmentData;
};