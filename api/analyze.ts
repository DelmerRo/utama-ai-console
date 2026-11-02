// api/analyze.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const maxDuration = 60;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("❌ Falta GEMINI_API_KEY en .env.local");
      return res.status(500).json({ error: 'La API Key de Gemini no está configurada en .env.local' });
    }

    // Leemos selectedModel enviado desde el frontend
    const { imageBase64, mimeType, input, selectedModel } = req.body || {};

    if (!imageBase64) {
      return res.status(400).json({ error: 'No se recibió la imagen en Base64.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey.trim());

    // Modelo elegido o fallback por defecto
    const targetModel = selectedModel || "gemini-3.6-flash";
    console.log(`[Gemini Engine] Ejecutando análisis con el modelo: ${targetModel}`);

    const model = genAI.getGenerativeModel({ model: targetModel });

    const prompt = `Actúa como un Director de Arte de E-commerce y Experto en Copywriting y SEO para Home & Deco.
Analiza la imagen adjunta y los siguientes datos provisionales proporcionados por el usuario:
- Nombre provisional: ${input?.name || 'N/A'}
- Material base: ${input?.material || 'N/A'}
- Dimensiones: ${input?.width || '-'}x${input?.depth || '-'}x${input?.height || '-'} cm
- Peso: ${input?.weight || '-'} kg
- Descripción técnica: ${input?.description || 'N/A'}

Tu tarea es enriquecer estos datos para generar prompts de generación de imágenes fotorrealistas y copy de ventas.

DEBES devolver ÚNICAMENTE un objeto JSON válido (sin bloques markdown de código) con la siguiente estructura y claves exactas:
{
  "nombreComercial": "Un nombre atractivo y SEO-friendly para el producto (max 60 caracteres)",
  "argumentosVenta": "3 viñetas persuasivas destacando los beneficios y la calidad",
  "materialDetectado": "Descripción hiperrealista y fotográfica del material basada en la foto",
  "estiloVisual": "DEBES ELEGIR EXACTAMENTE UNA de estas opciones basándote en el diseño: 'Nórdico', 'Escandinavo', 'Japandi', 'Scandi-Japandi', 'Wabi-Sabi', 'Minimalista Orgánico', 'Moderno', 'Rústico', 'Industrial', 'Mediterráneo Cálido', 'Clásico'",
  "contextoSugerido": "Dónde y cómo se usaría en una foto lifestyle elegante",
  "featurePrincipal": "La característica física más destacada para hacer un close-up macro",
  "componentesVisibles": "Props funcionales y vajilla de utilería recomendados para acompañar el producto en la foto lifestyle"
}`;

    const imageParts = [
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType || 'image/jpeg'
        }
      }
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    let responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error(`La respuesta de Gemini no incluyó un JSON válido: ${responseText}`);
    }

    const enrichedData = JSON.parse(jsonMatch[0]);
    return res.status(200).json(enrichedData);

  } catch (error: any) {
    console.error("DETALLE DEL ERROR EN TERMINAL:", error);
    return res.status(500).json({ 
      error: 'Error interno en el servidor al consultar Gemini', 
      details: error?.message || String(error)
    });
  }
}