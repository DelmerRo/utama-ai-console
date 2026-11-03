// src/domain/promptStrategies.ts
import { ProductInput, EnrichmentData } from '../types';
import { STYLE_SURFACE_MAP, DEFAULT_STYLE } from '../config/stylesMap';
import { getSetCompositionDirective } from './setComposition';

export interface PromptContext {
    name: string;
    material: string;
    style: string;
    context: string;
    feature: string;
    surface: string;
    setDirective: string;
    dims: string;
    input: ProductInput;
    enrichment: EnrichmentData;
}

export function buildPromptContext(input: ProductInput, enrichment: EnrichmentData): PromptContext {
    const name = enrichment.nombreComercial || input.name;
    const material = enrichment.materialDetectado || input.material;
    const style = enrichment.estiloVisual || DEFAULT_STYLE;
    const context = enrichment.contextoSugerido || "in a neutral home setting";
    const feature = enrichment.featurePrincipal || "";
    const surface = STYLE_SURFACE_MAP[style as keyof typeof STYLE_SURFACE_MAP] || STYLE_SURFACE_MAP[DEFAULT_STYLE];
    const setDirective = getSetCompositionDirective(name);
    const dims = `Ancho: ${input.width} cm, Profundidad: ${input.depth} cm, Alto: ${input.height} cm`;

    return { name, material, style, context, feature, surface, setDirective, dims, input, enrichment };
}

export const promptBuilders = {
    portada: (ctx: PromptContext) =>
        `High-end commercial hero studio product photography of ${ctx.name}, crafted from ${ctx.material}. ${ctx.setDirective}. CRITICAL GEOMETRY BINDING DIRECTIVE: The image MUST be a precise 1:1 high-fidelity physical recreation of the exact item shown in the reference image. The generation engine must strictly adhere to the reference photo for unique geometry, proportional aspect ratio, edge radius, surface texture, and natural material grain without altering, simplifying, or inventing details. TEXT & LABEL REMOVAL DIRECTIVE: Automatically detect and completely remove all price tags, barcode stickers, brand logos, and printed text from the object, seamlessly restoring the underlying natural texture. REAL-WORLD SCALE & SPATIAL ANCHOR: The product has physical dimensions of ${ctx.dims}. The engine must accurately represent these real-world proportions relative to the surrounding space, casting natural contact ambient occlusion shadows on the surface to convey accurate depth and physical weight. SETTING & LIGHTING: Positioned upon a ${ctx.surface}. Crisp, commercial high-contrast studio setup with a strong key light from the side and soft rim light to define contours and isolate the product sharply from the background. Background is a seamless matte plaster wall in a bright warm-white tone. Subtle ${ctx.style} design aesthetic. Zero dark zones, razor-sharp focus, pristine retail web catalog standard, aspect ratio 1:1 --ar 1:1 --v 6.0`,

    contexto: (ctx: PromptContext) =>
        `Aspirational commercial lifestyle e-commerce photography featuring ${ctx.name} made from ${ctx.material} in an elegant, real-world dining setting. TEXT & LABEL REMOVAL DIRECTIVE: CRITICAL — Automatically detect, erase, and completely remove all price tags, barcode stickers, brand logos, and printed text from the product, seamlessly restoring the underlying natural ${ctx.material} texture. SCENE & STYLING: Beautifully curated ${ctx.style} interior space with an airy, warm, and inviting home ambiance. The product is naturally styled in active use ${ctx.context} upon a premium ${ctx.surface}. FUNCTIONAL APPEAL & E-COMMERCE ENGAGEMENT: Arranged with high-end, realistic props (${ctx.enrichment.componentesVisibles || 'subtle decor'}) to clearly showcase its everyday practical use, scale, and decorative value, inspiring immediate customer purchase desire. LIGHTING & ATMOSPHERE: Soft, warm natural window light streams obliquely into the scene, illuminating the organic texture of the ${ctx.material} and casting soft, realistic shadows without any harsh dark zones or blown-out highlights. CRITICAL SCALE & GEOMETRY BINDING DIRECTIVE: The product MUST strictly match the exact physical geometry, realistic proportions, and material texture from the reference image. Real-world physical dimensions are ${ctx.dims}. The engine must maintain strict realistic scale relative to surrounding props and table surface without distorting or artificially enlarging the product. PHOTOGRAPHIC QUALITY: Shot with a professional 85mm lens, crisp focus on the main product, subtle natural depth-of-field background blur (bokeh), pristine retail web catalog standard, aspect ratio 1:1 --ar 1:1 --v 6.0`,

    detalle: (ctx: PromptContext) =>
        `Commercial high-definition macro close-up photography focusing on the authentic material texture, fine craftsmanship, and surface quality of ${ctx.name}. TEXT & LABEL REMOVAL DIRECTIVE: CRITICAL — Automatically detect, erase, and completely remove all price tags, barcode stickers, brand logos, and printed text from the object, seamlessly restoring the underlying natural texture. STRICT TEXTURE & GEOMETRY FIDELITY DIRECTIVE: The engine must strictly reproduce the exact tactile surface structure, weave pattern, fiber density, and natural grain shown in the reference image. DO NOT exaggerate roughness, invent artificial bump patterns, or distort the material's real physical appearance. PHYSICAL SCALE & ACCURACY ANCHOR: Product real-world dimensions are ${ctx.dims}. The macro perspective must reflect the true physical scale of the weave/surface relative to the product's actual thickness and geometry, maintaining strict architectural accuracy without altering edge radiuses or shape. LIGHTING & COMPOSITION: Precise 45-degree raking studio light to gently highlight the natural relief, depth, and organic tactile finish of the premium ${ctx.material} (${ctx.feature}) while eliminating pitch-black shadows. Clean, balanced micro-contrast that emphasizes authentic quality and refined ${ctx.style} design aesthetic. PHOTOGRAPHIC QUALITY: Ultra-sharp razor focus on the main texture focal point with a smooth, natural macro shallow depth-of-field, zero digital noise, pristine web e-commerce catalog standard, aspect ratio 1:1 --ar 1:1 --v 6.0`,

    ventas: (ctx: PromptContext) =>
        `High-end commercial catalog photograph of ${ctx.name} with ${ctx.material}. Immaculate centered square composition, paired with a single curated minimalist decorative accent. Staged in a bright architectural minimalist space with crisp morning sunlight creating sharp, clean, high-contrast decorative shadows. Atmosphere conveys serene tranquility with soft, slightly warm neutral daylight, creating an inviting look while strictly avoiding harsh cool or cold color casts. STRICT SCALE DIRECTIVE: Real-world physical dimensions are ${ctx.dims}. The engine must maintain precise realistic proportions relative to the surrounding architectural space and props. Pure luxury retail vibe, high product definition, clean lines, uncluttered ${ctx.style} fusion style, aspect ratio 1:1 --ar 1:1 --v 6.0`,

    escala: (ctx: PromptContext) =>
    `Aspirational commercial lifestyle photography explicitly designed to communicate the EXACT physical scale and real-world proportions of ${ctx.name} (${ctx.material}). STRICT REAL-WORLD DIMENSIONS BINDING: ${ctx.dims}. SCALING ANCHOR DIRECTIVE: The product MUST be displayed in direct contextual comparison to a universally recognized scale reference. If it is a tabletop or handheld item, show average-sized adult human hands naturally holding, touching, or interacting with it. If it is a larger floor item, show a portion of a human figure standing next to it or place it adjacent to standard architectural elements (like a standard doorway or dining chair). ZERO EXAGGERATION: The generation engine must strictly prevent artificial enlarging or shrinking of the product. LENS & PERSPECTIVE: Shot with a 50mm focal length lens (standard human eye perspective) to completely eliminate wide-angle spatial distortion and preserve exact relative scale. SETTING & STYLE: Placed ${ctx.context} upon a ${ctx.surface} with a ${ctx.style} aesthetic. Soft, natural daylight casting realistic shadows. Pristine e-commerce standard, aspect ratio 1:1 --ar 1:1 --v 6.0`,

    infografia: (ctx: PromptContext) =>
        `Minimalist home decor catalog infographic for a single ${ctx.name} in a 1:1 square ratio. Pristine, balanced layout featuring the product placed on a smooth, warm sand-colored surface against a bright matte off-white plaster wall backdrop. Soft, abundant natural daylight creates an airy, elegant lookbook aesthetic, keeping the product's exact realistic geometry and natural ${ctx.material} texture completely unaltered. The top area is entirely clean space, designed for vector overlays. Near the bottom edge, a perfectly aligned single horizontal row of six minimalist thin-line circular layout badges is overlaid directly onto the surface. Each circle contains stacked technical text for: PRODUCTO (${ctx.name}), MATERIAL (${ctx.material}), ANCHO (${ctx.input.width} cm), PROFUNDIDAD (${ctx.input.depth} cm), ALTO (${ctx.input.height} cm), PESO (${ctx.input.weight} kg). Pure ${ctx.style} retail standard, clean geometric UI, aspect ratio 1:1 --ar 1:1 --v 6.0`,

    copywriting: (ctx: PromptContext) =>
    `Actuá como un Copywriter E-commerce Senior experto en Neuroventas y Especialista en SEO técnico para Tiendanube y Mercado Libre Argentina.

Tu objetivo es redactar la descripción persuasiva y generar todos los metadatos técnicos y atributos de ficha técnica utilizando los datos inyectados.

DATOS DEL PRODUCTO A PROCESAR:
- Nombre Provisional: ${ctx.name}
- Estilo Decorativo: ${ctx.style}
- Material Principal: ${ctx.material}
- Feature Clave (Macro): ${ctx.feature}
- Argumentos de Venta (IA): ${ctx.enrichment.argumentosVenta}
- Dimensiones Físicas: ${ctx.dims}
- Peso Neto: ${ctx.input.weight} kg
- DESPIECE TÉCNICO: ${ctx.input.description || 'No especificado'}

INSTRUCCIONES CRÍTICAS (NEUROVENTAS Y FORMATO):
1. Tono de marca: Rioplatense ("vos", "llevá", "transformá"), cálido, sofisticado y empático.
2. Formato Escaneable: Usá párrafos cortos (máximo 3 líneas) para no abrumar visualmente.
3. Integración forzada: Debes usar obligatoriamente los 'Argumentos de Venta (IA)' en los beneficios y el 'DESPIECE TÉCNICO' exacto en la sección de Especificaciones.
4. Restricción técnica: Entregá directamente el contenido. NO agregues introducciones, confirmaciones ni bloques de código markdown (\`\`\`).

ESTRUCTURA DE SALIDA OBLIGATORIA (Copiá y pegá este formato exacto):

### 1. SEO Y CLASIFICACIÓN (TIENDANUBE Y MERCADO LIBRE)
- **Título Publicación / SEO:** [Máximo 60 caracteres. Fórmula: Producto + Material principal + Atributo clave. SIN emojis. Clave para el algoritmo de ML]
- **Descripción SEO (Tiendanube):** [Máximo 160 caracteres. Resumen persuasivo directo con CTA]
- **URL amigable:** [slug-todo-en-minusculas-separado-por-guiones]
- **Categoría Mercado Libre:** [Ruta exacta, ej: Hogar, Muebles y Jardín > Bazar y Cocina > ...]
- **Tags (Tiendanube):** [20 etiquetas separadas por comas. Incluir: variaciones de búsqueda, material, estilo ${ctx.style}, "decoracion hogar argentina", "bazar villa ortuzar", "envios a todo el pais"]

### 2. FICHA TÉCNICA (ATRIBUTOS OBLIGATORIOS MERCADO LIBRE)
- **Marca:** UTAMA DECO
- **Modelo:** [Sugerir un nombre de modelo comercial corto, distintivo y elegante acorde a Utama]
- **Diseño:** [Describir la trama o diseño de la superficie basado en la foto y el estilo, ej: Liso, Texturizado, Panal, Minimalista]
- **Forma:** [Especificar la forma geométrica o silueta física del producto, ej: Redondo, Rectangular, Cilíndrico, Orgánico]
- **Formato de venta:** [Unidad o Pack]
- **Unidades por pack:** [Inferir cantidad basándote en el nombre o despiece técnico. Ej: 1, 4, 6]
- **Color principal:** [Inferir el color predominante basándote en el estilo y material]
- **Atributos adicionales:** [Listar 2 o 3 características técnicas extra clave para ML según el producto (ej: Apto lavavajillas, Antideslizante, Ecológico)]

---

### 3. COPY DE VENTAS (PARA PEGAR EN LA DESCRIPCIÓN)

[TÍTULO PRINCIPAL EN MAYÚSCULAS BASADO EN NEUROVENTAS. DEBE CONECTAR CON LA EMOCIÓN, LA RUTINA O LA NATURALEZA. EJ: EL DETALLE QUE ELEVA CADA MOMENTO Y CONECTA CON LA NATURALEZA]

[Párrafo introductorio (2-3 líneas): Aplicá storytelling sensorial. Hacé que el cliente imagine usar el producto en su rutina diaria resaltando la calidez del estilo ${ctx.style}].

¿POR QUÉ ESTE PRODUCTO TRANSFORMARÁ TU ESPACIO?
- **[Beneficio Emocional/Visual]:** [Redactado basándote en los argumentos: ${ctx.enrichment.argumentosVenta}].
- **[Beneficio Funcional/Práctico]:** [Cómo facilita el día a día, el orden o el uso, destacando el atributo: ${ctx.feature}].
- **[La Medida Perfecta]:** [Por qué sus proporciones (${ctx.dims}) son ideales para integrarse al hogar sin incomodar].

ESPECIFICACIONES TÉCNICAS AL DETALLE:
- **Incluye:** [Listar de forma exacta cada pieza basándote estrictamente en el DESPIECE TÉCNICO].
- **Materialidad:** ${ctx.material}
- **Dimensiones Totales:** ${ctx.dims}
- **Peso:** ${ctx.input.weight} kg
- **Cuidados:** [Sugerencia lógica de mantenimiento diario según el material para garantizar durabilidad].

💡 **Tip de Styling Utama:** [Consejo exclusivo de interiorismo: dónde ubicarlo, con qué colores, luces o texturas combina para potenciar al máximo el estilo ${ctx.style} en su casa].

PREGUNTAS FRECUENTES:
- *¿Tienen stock?* Sí, si la publicación está activa, tenemos stock garantizado.
- *¿Hacen envíos?* Hacemos envíos a todo el país. Podés calcular el costo y demora ingresando tu código postal.
- *¿Es resistente el material?* [Generá una respuesta breve de 1 línea justificando la nobleza y durabilidad del material ${ctx.material}].

[CTA URGENTE: Ej: Transformá tus rituales diarios hoy. Hacé clic en "Comprar ahora" y llevate el tuyo antes de que se agote el stock.]`,

historia: (ctx: PromptContext) =>
    `Actuá como un Director Creativo de Social Media experto en estrategias de conversión para Instagram Stories.
Tu objetivo es diseñar un storyboard (guion visual y de animación) de 3 placas para lanzar el NUEVO INGRESO de Utama: ${ctx.name} (${ctx.material}), basándote en la imagen adjunta para generar los contenidos audiovisuales.

INSTRUCCIONES CRÍTICAS:
1. Tono rioplatense, cálido, empático y enfocado en la conversión directa.
2. NO uses saludos ni texto de relleno. Entregá directamente la estructura solicitada.
3. PROHIBIDO incluir encuestas, termómetros, cuestionarios ni ningún tipo de sticker interactivo.
4. RESTRICCIÓN ESTRICTA DE ZONAS SEGURAS: Bajo ninguna circunstancia coloques textos, títulos ni elementos clave en el margen superior (zona de la foto de perfil, nombre de usuario y botón de cierre 'X') ni en la franja inferior (zona de la caja de texto 'Enviar un mensaje', ícono de corazón y botón de compartir). Todo el texto debe vivir exclusivamente en el tercio central de la pantalla.

ESTRUCTURA DE SALIDA OBLIGATORIA:

### SECUENCIA DE INSTAGRAM STORIES: NUEVO INGRESO (3 PLACAS)
- **Audio/Música Sugerida:** [Sugerir un estilo de música en tendencia que encaje con el estilo ${ctx.style}. Ej: Acústico cálido, Lofi aesthetic]
- **Objetivo:** Generar hype, mostrar la calidad del material en movimiento y llevar tráfico directo a la tienda web.

**PLACA 1: EL ENGANCHE Y LA INTRIGA (Visual: Animación Close-up)**
- **Prompt Img2Vid (Para generar el video de fondo desde la imagen):** "Image-to-Video. STARTING FRAME: Attached reference image. MOTION: Subtle, slow macro zoom-in highlighting the exact texture of ${ctx.material} and ${ctx.feature}. Aspect ratio 9:16. Clean negative space top and bottom."
- **Texto en pantalla (Ubicación obligatoria: Tercio central, respetando zonas seguras):** "Acaba de ingresar algo que tu espacio te estaba pidiendo... ✨"

**PLACA 2: LA REVELACIÓN Y EL VALOR (Visual: Animación Lifestyle)**
- **Prompt Img2Vid (Para generar el video de fondo desde la imagen):** "Image-to-Video. STARTING FRAME: Attached reference image. MOTION: Gentle, fluid panning motion revealing the full product in use (${ctx.context}), showing its real scale (${ctx.dims}). Aspect ratio 9:16."
- **Cajas de Texto (Viñetas cortas ubicadas estrictamente en el tercio central):** 
  - ✔ [Sintetizar beneficio 1 basado en: ${ctx.enrichment.argumentosVenta}].
  - ✔ [Sintetizar beneficio 2 enfocado en cómo eleva el estilo ${ctx.style} de la casa].

**PLACA 3: LA CONVERSIÓN (Visual: Animación Minimalista / Catálogo)**
- **Prompt Img2Vid (Para generar el video de fondo desde la imagen):** "Image-to-Video. STARTING FRAME: Attached reference image. MOTION: Static centered product on ${ctx.surface} with subtle shifting natural light. Aspect ratio 9:16. Large negative space above."
- **Texto en pantalla (Ubicación obligatoria: Mitad inferior, por encima de la zona de mensajes pero sin tocar el borde superior):** "Hay muy poquitas unidades. Llevate el tuyo y dale ese toque Utama a tus días 🤎"
- **Sticker de Enlace (Link - Único elemento interactivo permitido):** [Proponer un texto persuasivo para el sticker de link, colocado justo arriba del área de respuesta de la historia. Ej: "🔗 QUIERO EL MÍO 🛒"]`,

reel: (ctx: PromptContext) =>
    `Actuá como un Director Creativo de Social Media y experto en Reels virales para Instagram y TikTok.
Tu objetivo es crear un guion técnico y visual de 15 segundos para presentar el NUEVO INGRESO de Utama: ${ctx.name} (${ctx.material}).

INSTRUCCIONES CRÍTICAS:
1. Tono rioplatense, dinámico y enfocado en retener la atención (Hook).
2. NO uses saludos ni texto de relleno. Entregá directamente la estructura.

ESTRUCTURA DE SALIDA OBLIGATORIA:

### GUION DE REEL: NUEVO INGRESO (15 SEGUNDOS)
- **Audio Sugerido:** [Sugerir tipo de audio: ej. Lofi chill, ASMR táctil del material, o audio en tendencia de diseño de interiores]
- **Vibe Visual:** Estilo ${ctx.style}, tomas dinámicas, cálidas y muy estéticas.

**SECUENCIA EXACTA DE GRABACIÓN:**
1. **HOOK VISUAL (0-3s):** [Acción dinámica llamativa para retener a la audiencia haciendo scroll. Ej: Desempaquetando, o sirviendo café]. 
   - *Texto en pantalla:* "Ingresó el detalle que le faltaba a tu hogar ✨"
2. **ASMR / DETALLE TÁCTIL (3-7s):** [Plano macro mostrando la textura de ${ctx.material} o el atributo clave: ${ctx.feature}]. 
   - *Texto en pantalla:* [Sintetizar un argumento de venta: ${ctx.enrichment.argumentosVenta}].
3. **LIFESTYLE & ESCALA (7-12s):** [El producto en uso real en el contexto sugerido: ${ctx.context}, mostrando sus dimensiones: ${ctx.dims}].
   - *Texto en pantalla:* "El toque ${ctx.style} que estabas buscando."
4. **CALL TO ACTION (12-15s):** [Toma final estética del producto completo centrado].
   - *Texto en pantalla:* "Ya disponible en la tienda web. Link en bio 🛒"

---
**CAPTION (Copia para el Post):**
¡NUEVO INGRESO! 🤎 El [Nombre corto sugerido] ya está acá. 
[Breve línea persuasiva de 2 renglones sobre cómo este producto transforma el espacio].
📏 Medidas: ${ctx.dims}
📦 Envíos a todo el país.

Conseguilo antes de que vuele en utama.com.ar (Link en bio).`


};  