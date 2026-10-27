// api/analyze.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Permite mayor tiempo de ejecución para la IA en Vercel
export const maxDuration = 60; 

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { imageBase64, mimeType, input } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY no está configurada en las variables de entorno.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Usamos gemini-1.5-pro por su alta capacidad de análisis visual y seguimiento de instrucciones
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json", // Forzamos JSON
      }
    });

    const prompt = `Actúa como un Director de Arte de E-commerce y Experto en Copywriting y SEO para Home & Deco.
    Analiza la imagen adjunta y los siguientes datos provisionales proporcionados por el usuario:
    - Nombre provisional: ${input.name}
    - Material base: ${input.material}
    - Dimensiones: ${input.width}x${input.depth}x${input.height} cm
    - Peso: ${input.weight} kg
    - Descripción técnica: ${input.description}

    Tu tarea es enriquecer estos datos para generar prompts de generación de imágenes fotorrealistas y copy de ventas.
    
    DEBES devolver ÚNICAMENTE un objeto JSON válido con la siguiente estructura y claves exactas:
    {
      "nombreComercial": "Un nombre atractivo y SEO-friendly para el producto (max 60 caracteres)",
      "argumentosVenta": "3 viñetas persuasivas destacando los beneficios y la calidad",
      "materialDetectado": "Descripción hiperrealista y fotográfica del material basada en la foto (ej: madera maciza de acacia natural esculpida a mano con acabado interior cálido y veteado orgánico visible...)",
      "estiloVisual": "DEBES ELEGIR EXACTAMENTE UNA de estas opciones basándote en el diseño: 'Nórdico', 'Escandinavo', 'Japandi', 'Scandi-Japandi', 'Wabi-Sabi', 'Minimalista Orgánico', 'Moderno', 'Rústico', 'Industrial', 'Mediterráneo Cálido', 'Clásico'",
      "contextoSugerido": "Dónde y cómo se usaría en una foto lifestyle elegante (ej: en una mesa de centro rústica sirviendo una picada, o sobre una mesada de mármol)",
      "featurePrincipal": "La característica física más destacada para hacer un close-up macro",
      "componentesVisibles": "Props funcionales y vajilla de utilería recomendados para acompañar el producto en la foto lifestyle (ej: cerámicas modernas, servilletas de lino, cristalería)"
    }`;

    const imageParts = [
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType
        }
      }
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text();
    
    // Gemini devuelve el JSON. Lo parseamos y lo enviamos al frontend.
    const enrichedData = JSON.parse(responseText);
    
    return res.status(200).json(enrichedData);

  } catch (error: any) {
    console.error("Error en la API de Gemini:", error);
    return res.status(500).json({ error: 'Error al procesar la imagen con IA', details: error.message });
  }
}