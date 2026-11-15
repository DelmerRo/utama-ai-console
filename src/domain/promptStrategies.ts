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

Conseguilo antes de que vuele en utama.com.ar (Link en bio).`,

meliVideo: (ctx: PromptContext) =>
    `@segundo-cerebro
Actuá como un Especialista en Marketing Digital, Creador de Contenido Audiovisual y Productor Ejecutivo de E-commerce para UTAMA Home & Deco. Tu objetivo es analizar la foto adjunta del producto e inyectar sus parámetros para generar un prompt de Video con IA (Img2Vid) y el Guion Técnico, optimizados para Mercado Libre Videos (Clips).

DATOS PARAMETRIZADOS DEL PRODUCTO:
- Nombre Comercial: ${ctx.name}
- Materiales y Acabado: ${ctx.material}
- Estilo Visual: ${ctx.style}
- Contexto de Uso: ${ctx.context}
- Feature Clave (Macro): ${ctx.feature}
- Dimensiones Físicas Reales: ${ctx.dims}
- Peso: ${ctx.input.weight} kg
- Despiece / Componentes: ${ctx.input.description || ctx.enrichment.componentesVisibles || 'No especificado'}
- Argumentos de Venta (IA): ${ctx.enrichment.argumentosVenta}

REGLAS DE CUMPLIMIENTO Y FORMATO (COMPLIANCE MERCADO LIBRE):
1. Formato 9:16 vertical. Ritmo de corte: máx 3s por plano.
2. CERO LLAMADOS A LA ACCIÓN (Sin CTA interno ni externo, sin "comprá", "link", marcas de agua ni datos de contacto). Compliance 100% legal ML.
3. SFX Obligatorios: SFX Foley/ASMR por cada acción física + SFX Tipeo de teclado (*keyboard typing*) o *pop* cada vez que aparece texto en pantalla.
4. Escala Real: Mantener proporciones estrictas relativas a manos o muebles (${ctx.dims}).
5. Directiva Img2Vid (2 Partes): Debido a limitaciones de duración del sistema, generá el prompt visual en 2 videos de 10 segundos cada uno. El segundo video debe ser la continuación exacta del primero, manteniendo total coherencia visual, de acción y de ritmo.
6. Tono y voz: Hablá como una mujer rioplatense de forma natural y cercana (usá voseo de Argentina/Uruguay). Tu tono debe transmitir confianza, calidez y entusiasmo auténtico, manteniendo una energía dinámica para captar la atención desde el primer segundo sin sonar a publicidad tradicional.

ESTRUCTURA DE SALIDA OBLIGATORIA:

### A. PROMPT IMG2VID (PARA EL GENERADOR DE VIDEO)
**PARTE 1 (0 a 10s):** "Image-to-Video. STARTING FRAME: Attached image of ${ctx.name}. MOTION: Show a cluttered space quickly transforming as the product is placed. Hands interact with the ${ctx.material} showing its scale (${ctx.dims}). Vertical 9:16."
**PARTE 2 (10 a 20s):** "Image-to-Video. CONTINUATION OF PART 1. MOTION: Seamlessly continue the action. Macro shot of the ${ctx.feature}, pulling back to reveal the product perfectly styled in a ${ctx.style} environment (${ctx.context}). Clean, no logos. Vertical 9:16."

### B. FICHA CONCEPTUAL Y GANCHO (HOOK)
- **Producto Identificado:** ${ctx.name} (${ctx.material})
- **Hook Inicial (0-3s):** [Acción o encuadre disruptivo para detener el scroll mostrando el problema visual del espacio]
- **Duración Estimada:** 20 segundos divididos en dos partes.

### C. GUION TÉCNICO TOMA POR TOMA

| Toma / Minutaje (Máx 3s) | Ángulo y Encuadre | Control de Escala / Entorno | Texto Overlay en Pantalla | Audio / Locución (Rioplatense) | Efecto de Sonido (SFX Acción + Tipeo) |
|---|---|---|---|---|---|
| **Video 1 - Toma 1** (0:00 - 0:03) | Plano general / Problema | Espacio desordenado | [Texto informativo corto] | "Si tu espacio se ve así..." | SFX Tipeo + Foley desorden |
| **Video 1 - Toma 2** (0:03 - 0:06) | Plano detalle del producto | Comparación con manos (${ctx.dims}) | [Beneficio funcional] | "Tranqui, mirá lo que ingresó." | SFX Foley encastre + Tipeo |
| **Video 1 - Toma 3** (0:06 - 0:10) | Plano medio / Transición | Colocación en superficie (${ctx.surface}) | [Detalle del material: ${ctx.material}] | "Súper práctico y re estético." | SFX Apoyo en ${ctx.surface} + Tipeo |
| **Video 2 - Toma 4** (0:10 - 0:13) | Plano macro (${ctx.feature}) | Textura hiperrealista | [Highlight de calidad] | "Fijate en este detalle divino." | SFX ASMR textura + Tipeo |
| **Video 2 - Toma 5** (0:13 - 0:17) | Plano general "Después" | Entorno transformado ${ctx.style} | [Solución de espacio final] | "Te cambia el ambiente por completo." | SFX Ambiente calmo + Tipeo |
| **Video 2 - Toma 6** (0:17 - 0:20) | Cierre 100% Visual | Producto limpio | [Variantes de color/tamaño] | Cierre musical (sin CTA) | SFX Tipeo |

### D. ESTRATEGIA DE CATÁLOGO EN MERCADO LIBRE
- **Sugerencia de Variantes:** [Sugerir variantes de color/tamaño según despiece]
- **Cierre Visual:** Transición final 100% visual y limpia mostrando la armonía del ambiente, SIN llamados a la acción ni texto publicitario.`,

  reelsUgc: (ctx: PromptContext) =>
    `@segundo-cerebro
Actuá como un Especialista en Marketing Digital, Creador UGC y Productor Audiovisual para UTAMA Home & Deco. Tu objetivo es generar un prompt de Video con IA (Img2Vid) y el Guion Técnico Completo para un Instagram Reel, optimizado para alcance, retención y conversión.

DATOS PARAMETRIZADOS DEL PRODUCTO:
- Nombre Comercial: ${ctx.name}
- Estilo Visual: ${ctx.style}
- Material Principal: ${ctx.material}
- Feature Clave: ${ctx.feature}
- Argumentos de Venta (IA): ${ctx.enrichment.argumentosVenta}
- Dimensiones Físicas: ${ctx.dims}
- Contexto Sugerido: ${ctx.context}
- Despiece Técnico: ${ctx.input.description || 'No especificado'}

REGLAS DE PRODUCCIÓN REELS:
1. Formato 9:16 vertical. Ritmo dinámico (máx 2-3s por plano).
2. Narrativa: El Problema (0-2s) -> Transición Solución -> El Después transformado en estilo ${ctx.style}.
3. SFX: Foley en materiales + SFX Tipeo de teclado al aparecer textos nativos de IG.
4. Directiva Img2Vid (2 Partes): Debido a limitaciones de duración del sistema, generá el prompt visual en 2 videos de 10 segundos cada uno. El segundo video debe ser la continuación exacta del primero, manteniendo total coherencia visual, de acción y de ritmo.
5. Tono y voz: Hablá como una mujer rioplatense de forma natural y cercana (usá voseo de Argentina/Uruguay). Tu tono debe transmitir confianza, calidez y entusiasmo auténtico, manteniendo una energía dinámica para captar la atención desde el primer segundo sin sonar a publicidad tradicional.

ESTRUCTURA DE SALIDA OBLIGATORIA:

### A. PROMPT IMG2VID (PARA EL GENERADOR DE VIDEO)
**PARTE 1 (0 a 10s):** "Image-to-Video. STARTING FRAME: Attached image. MOTION: Fast-paced UGC style. Start with a visual problem, then introduce ${ctx.name} with hands placing it down, establishing scale (${ctx.dims}). 9:16."
**PARTE 2 (10 a 20s):** "Image-to-Video. CONTINUATION OF PART 1. MOTION: Dynamic close-ups on the ${ctx.material}, resolving into a beautiful, styled ${ctx.context} room. 9:16."

### B. FICHA CONCEPTUAL
- **Producto:** ${ctx.name} (${ctx.material})
- **Hook Inicial:** [Acción o sonido disruptivo en los primeros 2 segundos]
- **Audio Sugerido:** [Estilo Lo-Fi chill, acústico o ASMR en tendencia]

### C. GUION TÉCNICO TOMA POR TOMA

| Toma / Minutaje | Acción Visual y Ángulo | Control de Escala | Texto Nativo IG | Audio y Voz en Off (Rioplatense) | SFX (Acción + Tipeo) |
|---|---|---|---|---|---|
| **Vid 1 - Toma 1** (0:00 - 0:02) | Plano corto / El Problema | Espacio con ruido visual | "Si tu espacio se ve así..." | "Si te pasa esto siempre..." | SFX Pop + Tipeo |
| **Vid 1 - Toma 2** (0:02 - 0:05) | Transición con el producto | Manos sosteniendo (${ctx.dims}) | "Necesitás esto 🤎" | "Cortá con el ruido visual, mirá." | SFX Foley movimiento + Tipeo |
| **Vid 1 - Toma 3** (0:05 - 0:10) | Plano medio / En uso (${ctx.context}) | Proporción exacta en ambiente | [Beneficio: ${ctx.enrichment.argumentosVenta}] | "Queda re lindo y te organiza todo súper fácil." | SFX Foley encastre + Tipeo |
| **Vid 2 - Toma 4** (0:10 - 0:14) | Macro detalle (${ctx.feature}) | Textura de ${ctx.material} | "Calidad que se siente" | "Fijate la nobleza de este material, me encanta." | SFX ASMR + Tipeo |
| **Vid 2 - Toma 5** (0:14 - 0:20) | Plano final armonioso | Entorno ${ctx.style} ordenado | "Comentá ORDEN y te mando el link" | "Comentá abajo y te paso el link por DM." | SFX Tipeo final |

### D. ESTRATEGIA DE CONVERSIÓN Y CAPTION
- **Call To Action (CTA):** "Comentá la palabra [PALABRA_CLAVE] y te envío el link con descuento exclusivo por DM."
- **Copy del Post (Caption SEO):**
  "Transformá tu rutina con el toque ${ctx.style} que te faltaba 🤎 
  El ${ctx.name} en ${ctx.material} está diseñado para simplificar y ordenar tu espacio.
  📏 Medidas: ${ctx.dims}
  📦 Envíos a todo el país.
  👉 Comentá [PALABRA_CLAVE] y te mandamos toda la info por privado!"`,

  storiesSecuencia: (ctx: PromptContext) =>
    `@segundo-cerebro
Actuá como un Community Manager y Content Strategist para UTAMA Home & Deco. Tu objetivo es generar un prompt de Video con IA (Img2Vid) y un Guion Secuencial para Instagram Stories enfocado en la cercanía, la solución de un problema doméstico y el clic directo.

DATOS PARAMETRIZADOS DEL PRODUCTO:
- Nombre Comercial: ${ctx.name}
- Estilo: ${ctx.style}
- Material Principal: ${ctx.material}
- Feature Clave: ${ctx.feature}
- Argumentos de Venta: ${ctx.enrichment.argumentosVenta}
- Medidas Físicas: ${ctx.dims}
- Contexto de Uso: ${ctx.context}
- Despiece Técnico: ${ctx.input.description || 'No especificado'}

REGLAS STORIES:
1. Formato 9:16 vertical.
2. Narrativa Antes vs Después (Prob -> Proceso/Detalle -> Después -> Conversión).
3. Stickers Interactivos Nativos en cada placa (Encuestas, Sliders, Cuestionarios).
4. SFX ASMR al manipular + SFX Tipeo de teclado al mostrar texto.
5. Directiva Img2Vid (2 Partes): Debido a limitaciones de duración del sistema, generá el prompt visual en 2 videos de 10 segundos cada uno. El segundo video debe ser la continuación exacta del primero, manteniendo total coherencia visual, de acción y de ritmo.
6. Tono y voz: Hablá como una mujer rioplatense de forma natural y cercana (usá voseo de Argentina/Uruguay). Tu tono debe transmitir confianza, calidez y entusiasmo auténtico, manteniendo una energía dinámica para captar la atención desde el primer segundo sin sonar a publicidad tradicional.

ESTRUCTURA DE SALIDA OBLIGATORIA:

### A. PROMPT IMG2VID (PARA EL GENERADOR DE VIDEO)
**PARTE 1 (0 a 10s):** "Image-to-Video. STARTING FRAME: Attached image. MOTION: POV perspective. Hand brings the ${ctx.name} into the frame, showing its exact scale (${ctx.dims}) in a ${ctx.style} home. Vertical 9:16."
**PARTE 2 (10 a 20s):** "Image-to-Video. CONTINUATION OF PART 1. MOTION: Camera glides slowly around the product placed in a beautifully lit ${ctx.context}, focusing on the ${ctx.feature}. Clean negative space for Instagram UI. Vertical 9:16."

### B. SECUENCIA DE HISTORIAS DE INSTAGRAM (3 A 4 PLACAS)

| Historia # | Acción Visual (Ref. Fotos) | Control de Escala | Textos y Stickers Interactivos | SFX y Voz Rioplatense |
|---|---|---|---|---|
| **Vid 1 - Historia 1 (El Problema)** | Muestra espacio desordenado o sin vida | Entorno real | Texto: "¿Tuyo también se ve así?" / Sticker: [Encuesta Sí/No] | SFX Tipeo / Voz: "Che, ¿a vos también te estresa ver el espacio así de lleno?" |
| **Vid 1 - Historia 2 (El Detalle)** | Macro de ${ctx.material} y ${ctx.feature} | Manos mostrando (${ctx.dims}) | Texto: "Textura y acabado ${ctx.style} único 🌿" / Sticker: [Slider de Enamorado 😍] | SFX ASMR / Voz: "Mirá la calidez que tiene esto, no puede ser más lindo." |
| **Vid 2 - Historia 3 (El Después)** | Producto en uso en ${ctx.context} | Ambiente equilibrado | Texto: "[Beneficio: ${ctx.enrichment.argumentosVenta}]" / Sticker: [Cuestionario u Opinión] | SFX Foley / Voz: "Literal, te cambia la vibra de todo el ambiente en dos segundos." |
| **Vid 2 - Historia 4 (Conversión)** | Plano limpio sobre ${ctx.surface} | Producto completo | Texto: "Últimas unidades disponibles 🤎" / Sticker: [Sticker de Link a Tienda] | SFX Tipeo / Voz: "Quedan súper poquitos, llevate el tuyo acá abajo." |

### C. ESTRATEGIA DE CONVERSIÓN FINAL
- **Sticker de Enlace (Link):** "🔗 COMPRAR CON ENVÍO GRATIS 🛒" (Ubicado centrado en el tercio inferior, arriba del área de respuesta).`,
carruselDinamico: (ctx: PromptContext) => {
        const mainBenefit = ctx.enrichment.argumentosVenta 
            ? ctx.enrichment.argumentosVenta.split('\n')[0].replace(/^[•\-*]\s*/, '') 
            : `Diseño ${ctx.style} que transforma tu espacio al instante.`;

        return [
            {
                stepName: "1. Portada / Gancho (Detiene el scroll)",
                overlayText: `¿Sentís que a tu mesa le falta calidez y personalidad? ✨ Deslizá y mirá cómo cambiarlo en segundos 👉`,
                interactionTip: "Ubicá este texto arriba o abajo en tipografía limpia. Agregá un ícono de flecha hacia la derecha para incentivar el swipe.",
                imagePrompt: `High-end commercial Instagram carousel cover photo (Part 1/5 - Hook). Product: ${ctx.name}, crafted from ${ctx.material}. CRITICAL GEOMETRY BINDING DIRECTIVE: Precise 4:5 high-fidelity physical recreation of the reference item. Vertical 4:5 aspect ratio, clean background with generous negative space at the top for text overlay, strong key light from the side, stunning hook visual framing the ${ctx.style} aesthetic. Zero text, pristine retail standard, aspect ratio 4:5 --ar 4:5 --v 6.0`
            },
            {
                stepName: "2. La Solución / Propuesta de Valor",
                overlayText: `El secreto está en los materiales nobles: ${mainBenefit} 🌿`,
                interactionTip: "Texto breve en una esquina limpia para no tapar el producto en uso.",
                imagePrompt: `Aspirational Instagram carousel narrative photo (Part 2/5 - Context & Use). Featuring ${ctx.name} (${ctx.material}) in active use ${ctx.context}. Highlighting core benefit: "${ctx.enrichment.argumentosVenta}". Maintaining exact physical scale (${ctx.dims}) and consistent ${ctx.style} lighting and warm neutral color palette. Vertical 4:5 format, zero text, aspect ratio 4:5 --ar 4:5 --v 6.0`
            },
            {
                stepName: "3. Detalle Sensorial (Tacto y Calidad)",
                overlayText: `Mirá esa textura artesanal... ${ctx.feature || 'Terminaciones pensadas para durar'} 🤎`,
                interactionTip: "Texto minimalista en el borde inferior. Dejá que el zoom macro hable por sí solo.",
                imagePrompt: `Aspirational Instagram carousel narrative photo (Part 3/5 - Detail & Texture). High-definition macro vertical shot focusing on the texture and finish of ${ctx.material} (${ctx.feature}). Strict visual continuity with previous carousel frames. Vertical 4:5 format, zero text, aspect ratio 4:5 --ar 4:5 --v 6.0`
            },
            {
                stepName: "4. Lifestyle / Transformación del Hogar",
                overlayText: `Imaginá tus desayunos o cenas de todos los días con esta calidez ${ctx.style} ✨ ¿Con quién estrenarías esta mesa?`,
                interactionTip: "Pregunta directa en placa para fomentar comentarios y etiquetados.",
                imagePrompt: `Aspirational Instagram carousel narrative photo (Part 4/5 - Lifestyle Integration). Showing ${ctx.name} beautifully styled in a broader vertical home environment, surrounded by curated props (${ctx.enrichment.componentesVisibles || 'subtle decor'}), emphasizing daily tranquility and elegance. Vertical 4:5 format, zero text, aspect ratio 4:5 --ar 4:5 --v 6.0`
            },
            {
                stepName: "5. Cierre / Llamado a la Acción (CTA)",
                overlayText: `¿Querés renovar tu hogar hoy? 🏡\n💬 Comentá "INFO" y te mandamos el link directo a nuestra tienda (o entrá al link de la bio).`,
                interactionTip: "Centrá el texto en el espacio negativo superior/inferior. Ideal para activar respuestas automáticas en IG.",
                imagePrompt: `High-end commercial Instagram carousel closing photo (Part 5/5 - CTA Background). Clean minimalist vertical aesthetic showcasing ${ctx.name} centered on a ${ctx.surface} with generous negative space at the top and bottom for text overlay and call-to-action. Vertical 4:5 format, zero text, aspect ratio 4:5 --ar 4:5 --v 6.0`
            }
        ];
    }

};  