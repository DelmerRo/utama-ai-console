// src/api/gemini.ts
import { ProductInput, EnrichmentData } from '../types';

/**
 * Redimensiona y comprime la imagen a un tamaño óptimo para Gemini (máx 1024px, JPEG 80% calidad)
 */
const compressImageAndToBase64 = (file: File): Promise<{ base64Data: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
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
  selectedModel: string = 'gemini-3.6-flash'
): Promise<EnrichmentData> => {
  if (!input.imageFile) {
    throw new Error("Se requiere una imagen para el análisis de IA.");
  }

  try {
    const { base64Data, mimeType } = await compressImageAndToBase64(input.imageFile);

    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64: base64Data,
        mimeType,
        selectedModel, // Se envía el modelo elegido al backend
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

    const data = await response.json();
    return data as EnrichmentData;

  } catch (error) {
    console.error("Error al comunicar con el backend:", error);
    throw error;
  }
};