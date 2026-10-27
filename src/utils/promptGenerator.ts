// src/utils/promptGenerator.ts
import { ProductInput, EnrichmentData } from '../types';

const styleSurfaceMap: Record<string, string> = {
  "Nórdico": "polished Silestone Stellar White quartz surface",
  "Escandinavo": "natural light oak wood surface",
  "Japandi": "warm light-beige microcement countertop",
  "Scandi-Japandi": "smooth light microcement surface",
  "Wabi-Sabi": "textured off-white lime plaster countertop",
  "Minimalista Orgánico": "seamless white Carrara marble with subtle grey veins",
  "Moderno": "polished white quartz with subtle silver speckles",
  "Rústico": "reclaimed solid pine wood table surface",
  "Industrial": "smooth dark grey polished concrete surface",
  "Mediterráneo Cálido": "honed light beige travertine stone surface",
  "Clásico": "luxurious polished Calacatta marble countertop"
};

function getSetCompositionDirective(nameText: string): string {
  if (!nameText) return "featured as a single standalone hero object centered in the frame";
  const setRegex = /(?:set|juego)\s*(?:x|\bde\b)?\s*(\d+)/i;
  const match = nameText.match(setRegex);
  if (match && match[1]) {
    return `arranged as a neat, premium multi-piece collection of exactly ${match[1]} matching items, displayed in an elegant overlapping or grouped composition showing depth, scale, and exact physical quantity`;
  }
  return "featured as a single standalone hero object centered in the frame";
}

export const generatePrompts = (input: ProductInput, enrichment: EnrichmentData) => {
  // Usamos los datos enriquecidos por la IA si existen, sino hacemos fallback a los inputs originales
  const name = enrichment.nombreComercial || input.name;
  const material = enrichment.materialDetectado || input.material;
  const style = enrichment.estiloVisual || "Nórdico";
  const context = enrichment.contextoSugerido || "in a neutral home setting";
  const feature = enrichment.featurePrincipal || "";
  const surface = styleSurfaceMap[style] || styleSurfaceMap["Nórdico"];
  const setDirective = getSetCompositionDirective(name);
  
  const dims = `Width: ${input.width} cm, Depth: ${input.depth} cm, Height: ${input.height} cm`;

  return {
    portada: `High-end commercial hero studio product photography of ${name}, crafted from ${material}. ${setDirective}. CRITICAL GEOMETRY BINDING DIRECTIVE: The image MUST be a precise 1:1 high-fidelity physical recreation of the exact item shown in the reference image. The generation engine must strictly adhere to the reference photo for unique geometry, proportional aspect ratio, edge radius, surface texture, and natural material grain without altering, simplifying, or inventing details. TEXT & LABEL REMOVAL DIRECTIVE: Automatically detect and completely remove all price tags, barcode stickers, brand logos, and printed text from the object, seamlessly restoring the underlying natural texture. REAL-WORLD SCALE & SPATIAL ANCHOR: The product has physical dimensions of ${dims}. The engine must accurately represent these real-world proportions relative to the surrounding space, casting natural contact ambient occlusion shadows on the surface to convey accurate depth and physical weight. SETTING & LIGHTING: Positioned upon a ${surface}. Crisp, commercial high-contrast studio setup with a strong key light from the side and soft rim light to define contours and isolate the product sharply from the background. Background is a seamless matte plaster wall in a bright warm-white tone. Subtle ${style} design aesthetic. Zero dark zones, razor-sharp focus, pristine retail web catalog standard, aspect ratio 1:1 --ar 1:1 --v 6.0`,
    
    contexto: `Aspirational commercial lifestyle e-commerce photography featuring ${name} made from ${material} in an elegant, real-world dining setting. TEXT & LABEL REMOVAL DIRECTIVE: CRITICAL — Automatically detect, erase, and completely remove all price tags, barcode stickers, brand logos, and printed text from the product, seamlessly restoring the underlying natural ${material} texture. SCENE & STYLING: Beautifully curated ${style} interior space with an airy, warm, and inviting home ambiance. The product is naturally styled in active use ${context} upon a premium ${surface}. FUNCTIONAL APPEAL & E-COMMERCE ENGAGEMENT: Arranged with high-end, realistic props (${enrichment.componentesVisibles || 'subtle decor'}) to clearly showcase its everyday practical use, scale, and decorative value, inspiring immediate customer purchase desire. LIGHTING & ATMOSPHERE: Soft, warm natural window light streams obliquely into the scene, illuminating the organic texture of the ${material} and casting soft, realistic shadows without any harsh dark zones or blown-out highlights. CRITICAL SCALE & GEOMETRY BINDING DIRECTIVE: The product MUST strictly match the exact physical geometry, realistic proportions, and material texture from the reference image. Real-world physical dimensions are ${dims}. The engine must maintain strict realistic scale relative to surrounding props and table surface without distorting or artificially enlarging the product. PHOTOGRAPHIC QUALITY: Shot with a professional 85mm lens, crisp focus on the main product, subtle natural depth-of-field background blur (bokeh), pristine retail web catalog standard, aspect ratio 1:1 --ar 1:1 --v 6.0`,
    
    detalle: `Commercial high-definition macro close-up photography focusing on the authentic material texture, fine craftsmanship, and surface quality of ${name}. TEXT & LABEL REMOVAL DIRECTIVE: CRITICAL — Automatically detect, erase, and completely remove all price tags, barcode stickers, brand logos, and printed text from the object, seamlessly restoring the underlying natural texture. STRICT TEXTURE & GEOMETRY FIDELITY DIRECTIVE: The engine must strictly reproduce the exact tactile surface structure, weave pattern, fiber density, and natural grain shown in the reference image. DO NOT exaggerate roughness, invent artificial bump patterns, or distort the material's real physical appearance. PHYSICAL SCALE & ACCURACY ANCHOR: Product real-world dimensions are ${dims}. The macro perspective must reflect the true physical scale of the weave/surface relative to the product's actual thickness and geometry, maintaining strict architectural accuracy without altering edge radiuses or shape. LIGHTING & COMPOSITION: Precise 45-degree raking studio light to gently highlight the natural relief, depth, and organic tactile finish of the premium ${material} (${feature}) while eliminating pitch-black shadows. Clean, balanced micro-contrast that emphasizes authentic quality and refined ${style} design aesthetic. PHOTOGRAPHIC QUALITY: Ultra-sharp razor focus on the main texture focal point with a smooth, natural macro shallow depth-of-field, zero digital noise, pristine web e-commerce catalog standard, aspect ratio 1:1 --ar 1:1 --v 6.0`,
    
    ventas: `High-end commercial catalog photograph of ${name} with ${material}. Immaculate centered square composition, paired with a single curated minimalist decorative accent. Staged in a bright architectural minimalist space with crisp morning sunlight creating sharp, clean, high-contrast decorative shadows. Atmosphere conveys serene tranquility with soft, slightly warm neutral daylight, creating an inviting look while strictly avoiding harsh cool or cold color casts. STRICT SCALE DIRECTIVE: Real-world physical dimensions are ${dims}. The engine must maintain precise realistic proportions relative to the surrounding architectural space and props. Pure luxury retail vibe, high product definition, clean lines, uncluttered ${style} fusion style, aspect ratio 1:1 --ar 1:1 --v 6.0`,
    
    infografia: `Minimalist home decor catalog infographic for a single ${name} in a 1:1 square ratio. Pristine, balanced layout featuring the product placed on a smooth, warm sand-colored surface against a bright matte off-white plaster wall backdrop. Soft, abundant natural daylight creates an airy, elegant lookbook aesthetic, keeping the product's exact realistic geometry and natural ${material} texture completely unaltered. The top area is entirely clean space, designed for vector overlays. Near the bottom edge, a perfectly aligned single horizontal row of six minimalist thin-line circular layout badges is overlaid directly onto the surface. Each circle contains stacked technical text for: PRODUCTO (${name}), MATERIAL (${material}), ANCHO (${input.width} cm), PROFUNDIDAD (${input.depth} cm), ALTO (${input.height} cm), PESO (${input.weight} kg). Pure ${style} retail standard, clean geometric UI, aspect ratio 1:1 --ar 1:1 --v 6.0`,
    
    copywriting: `Act as a Master Copywriter and E-commerce Specialist with deep expertise in Neuromarketing and SEO for Mercado Libre Argentina and Tiendanube.

YOUR MISSION:
Analyze the attached product image alongside the injected technical parameters. Generate high-converting e-commerce copy structured exactly like a high-end web store listing, with clear bold headings, bullet points, and italicized sub-headers, including complete SEO metadata for web indexing.

PRODUCT INPUT DATA:
- Product Name: ${name}
- Material & Texture: ${material}
- Interior Design Style: ${style}
- Usage Context: ${context}
- Key Aesthetic Feature: ${feature}
- Selling Points: ${enrichment.argumentosVenta}
- Dimensions: ${input.width} cm (Width) x ${input.depth} cm (Depth) x ${input.height} cm (Height)
- Weight: ${input.weight} kg

[Sigue la misma estructura estricta que tenías en tu código original para el output, manteniendo el formato visual y el tono 'vos' argentino].`
  };
};