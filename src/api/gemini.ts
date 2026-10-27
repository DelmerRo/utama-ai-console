// src/api/gemini.ts
import axios from 'axios';
import { ProductInput, EnrichmentData } from '../types';

/**
 * Convierte un objeto File a una cadena Base64
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      // Quitamos el prefijo 'data:image/jpeg;base64,' para enviarlo limpio a Gemini
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const analyzeProductWithAI = async (input: ProductInput): Promise<EnrichmentData> => {
  if (!input.imageFile) {
    throw new Error("Se requiere una imagen para el análisis de IA.");
  }

  try {
    const imageBase64 = await fileToBase64(input.imageFile);
    const mimeType = input.imageFile.type;

    // Llamamos a nuestra Serverless Function de Vercel
    const response = await axios.post('/api/analyze', {
      imageBase64,
      mimeType,
      input: {
        name: input.name,
        material: input.material,
        width: input.width,
        depth: input.depth,
        height: input.height,
        weight: input.weight,
        description: input.description
      }
    });

    return response.data as EnrichmentData;
  } catch (error) {
    console.error("Error al comunicar con el backend:", error);
    throw error;
  }
};