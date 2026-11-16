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
        `Actuá como un Director de E-commerce, Especialista en Neuromarketing, SEO Técnico y Posicionamiento Local (CABA) con amplia experiencia en el mercado argentino de Home & Deco, trabajando exclusivamente para la marca UTAMA Home & Deco.

Tu misión es transformar los datos del producto y la foto adjunta en una ficha comercial de altísima conversión, lista para copiar y pegar sin ediciones manuales en Tiendanube y Mercado Libre Argentina.

DATOS DEL PRODUCTO INYECTADOS:
- Nombre Provisional: ${ctx.name}
- Estilo Decorativo: ${ctx.style}
- Material Principal: ${ctx.material}
- Feature Clave (Macro): ${ctx.feature}
- Argumentos de Venta (IA): ${ctx.enrichment.argumentosVenta}
- Dimensiones Físicas del Producto: ${ctx.dims}
- Peso Neto: ${ctx.input.weight} kg
- DESPIECE TÉCNICO Y EMBALAJE: ${ctx.input.description || 'No especificado'}

REGLAS DE ORO (CUMPLIMIENTO ESTRICTO):
1. Voz y Tono UTAMA: Español rioplatense natural ("vos", "llevá", "transformá", "elegí"), cálido, directo, minimalista y cercano. Evitá introducciones poéticas largas o clichés genéricos ("excelente calidad", "el mejor del mercado").
2. Hook Orientado al Problema (Mobile-First): En Tiendanube, el <h2> debe ir en formato oración (PROHIBIDO TODO EN MAYÚSCULAS) y tener máximo 55 caracteres para no ocupar 4 renglones en celular. El primer párrafo debe resolver un problema cotidiano real en máximo 3 líneas cortas.
3. Cero Alucinaciones Técnicas: Usá exactamente las piezas, capacidades y medidas presentes en el DESPIECE TÉCNICO y en la foto. Si el embalaje no está especificado en el input, calculá un margen lógico de protección (+2 a +4 cm por lado y +0,25 kg de caja/protección) aclarándolo como medida aproximada de embalaje reforzado.
4. Jerarquía HTML y Limpieza Visual:
   - En Tiendanube: Usá ÚNICAMENTE etiquetas <h2>, <h3>, <p>, <ul>, <li>, <strong> y <a href="...">. PROHIBIDO usar <h1> (reservado al título de la ficha) y PROHIBIDO usar cursivas (<em> / <i>) en bloques largos.
   - En Mercado Libre: Usá TEXTO PLANO 100% limpio con encabezados en MAYÚSCULAS y guiones (-). PROHIBIDO dejar etiquetas HTML, corchetes "[...]" o textos de instrucción como "[H2 EQUIVALENTE]" en la salida.
5. Psicología de Beneficios (Framework C-V-I): Cada viñeta de beneficio debe conectar la Característica física -> Ventaja funcional -> Impacto en la rutina diaria, atacando objeciones reales (fragilidad, espacio, limpieza).
6. Compliance por Canal:
   - Tiendanube: Potenciá el 20% OFF por transferencia bancaria automática y el envío Express en el día para CABA / Zona Norte.
   - Mercado Libre: CERO menciones a redes sociales, web propia, WhatsApp o descuentos por transferencia (para evitar sanciones de ML).
7. Salida Directa: Entregá únicamente los 4 bloques estructurados. Sin saludos, introducciones ni comentarios finales.

ESTRUCTURA DE SALIDA OBLIGATORIA:

=== BLOQUE 1: SEO GENERAL, LOCAL Y TIENDANUBE ===
- **Meta Title (Título SEO Google - Máx. 60 caracteres exactos):** [Palabra clave principal + Material + Capacidad/Atributo + UTAMA Home & Deco]
- **Meta Description (Descripción SEO - Máx. 155 caracteres exactos):** [Gancho directo + beneficio clave + 20% OFF transferencia + envíos a todo el país]
- **URL Amigable (Slug):** [slug-en-minusculas-sin-acentos-ni-simbolos-separado-por-guiones]
- **Título H1 Tiendanube (Editorial y de Marca - Entre 58 y 68 caracteres):** [Ej: Set x4 Tazas Apilables de Cerámica Texturada con Rack Metálico (285 ml)]
- **Categoría Exacta Sugerida (Tiendanube - Catálogo Home & Deco):** [Ruta jerárquica exacta, ej: Bazar y Cocina > Vajilla > Tazas y Mugs]
- **Línea / Colección:** [Nombre de la línea o colección UTAMA acorde al producto y al estilo ${ctx.style}]
- **Tags / Etiquetas Estratégicas (25 etiquetas separadas por comas — SEO Nacional + Hiperlocal CABA):** [Incluir sinónimos de búsqueda, material, estilo ${ctx.style}, línea/colección, ocasión de regalo y términos locales obligatorios: "decoracion villa urquiza", "regaleria villa urquiza", "bazar villa urquiza", "home deco caba", "deco hogar belgrano", "decoracion saavedra", "decoracion coghlan", "decoracion villa ortuzar", "regalos originales caba", "envios a todo el pais", "utama home deco"]

---

=== BLOQUE 2: DESCRIPCIÓN TIENDANUBE (HTML LIMPIO H2 / H3) ===

<p><strong>Colección / Línea:</strong> [Nombre de la línea o colección UTAMA]</p>

<h2>[Titular corto en formato oración —máx. 55 caracteres, NO en mayúsculas— que resuelva el problema principal del usuario]</h2>
<p>[Párrafo directo de 2 a 3 líneas: atacá el problema cotidiano del usuario y mostrá cómo este producto en ${ctx.material} (${ctx.dims}) aporta orden, funcionalidad y calidez ${ctx.style} al instante.]</p>

<h3>¿Por qué este producto transformará tu rutina?</h3>
<ul>
  <li><strong>[Beneficio Funcional / Problema Resuelto]:</strong> [Redactado con estructura Característica -> Ventaja -> Impacto diario, integrando: ${ctx.enrichment.argumentosVenta}].</li>
  <li><strong>[Beneficio Práctico / Orden o Uso]:</strong> [Cómo simplifica el día a día, ahorra espacio o mejora la experiencia, destacando: ${ctx.feature}].</li>
  <li><strong>[Proporción y Versatilidad]:</strong> [Por qué sus medidas exactas (${ctx.dims}) se adaptan con equilibrio a distintos ambientes sin recargar visualmente].</li>
</ul>

<h3>Especificaciones Técnicas y Embalaje</h3>
<ul>
  <li><strong>Línea / Colección:</strong> [Nombre de la línea o colección]</li>
  <li><strong>Incluye:</strong> [Detalle exacto de piezas según el DESPIECE TÉCNICO].</li>
  <li><strong>Materialidad:</strong> ${ctx.material}</li>
  <li><strong>Dimensiones del Producto:</strong> ${ctx.dims}</li>
  <li><strong>Peso Neto:</strong> ${ctx.input.weight} kg</li>
  <li><strong>Medidas y Especificaciones de Embalaje:</strong> [Dimensiones exactas de la caja/empaque, peso bruto total y detalle de doble protección anti-impacto para envío seguro].</li>
  <li><strong>Cuidados y Mantenimiento:</strong> [Instrucción clara y práctica de limpieza y conservación según el material].</li>
</ul>

<h3>Tip de Styling UTAMA</h3>
<p>[Consejo concreto de interiorismo: con qué texturas, maderas, iluminación o piezas combinarlo para potenciar el estilo ${ctx.style} en su ambiente.]</p>

<h3>Preguntas Frecuentes</h3>
<ul>
  <li><strong>¿Cómo se procesan los pagos?</strong> 💳 <strong>Pagos Seguros:</strong> Transferencias automáticas procesadas de forma segura y transparente por <strong>Pago Nube (DLocal Argentina)</strong>. El sistema valida tu pago al instante sin necesidad de enviar comprobantes.</li>
  <li><strong>¿Tienen stock disponible y cuándo despachan?</strong> Sí, si la publicación está activa contamos con stock real. Despachamos todos los pedidos dentro de las 24 hs hábiles (y contamos con envío Express en el día para CABA y Zona Norte comprando antes de las 13 hs).</li>
  <li><strong>¿Hacen envíos a todo el país y cómo protegen los productos frágiles?</strong> Sí, llegamos a toda Argentina. Cada pieza se embala cuidadosamente con doble protección anti-impacto y caja reforzada para que llegue impecable a tus manos.</li>
  <li><strong>¿Realizan cambios o devoluciones?</strong> Sí, tenés 30 días corridos desde que recibís tu compra para gestionar cambios o devoluciones (<a href="/politica-de-devolucion1">ver política completa</a>), siempre que el producto esté sin uso y en su embalaje original.</li>
  <li><strong>¿Es resistente el material?</strong> [Respuesta breve y contundente de 1-2 líneas justificando la resistencia, terminación y durabilidad del ${ctx.material}]. ¿Tenés otra duda? <a href="/contacto">Escribinos acá</a>.</li>
</ul>

<p><strong>[CTA DE CIERRE PERSUASIVO: Ej: Sumá orden y calidez a tus días hoy. Agregalo al carrito ahora y aprovechá 20% OFF abonando con transferencia bancaria instantánea.]</strong></p>

---

=== BLOQUE 3: MERCADO LIBRE ARGENTINA (ALGORITMO Y FICHA TÉCNICA) ===
- **Título Publicación Mercado Libre (MÁXIMO 60 CARACTERES EXACTOS — CONTAR LETRAS Y ESPACIOS):**
  [FÓRMULA ESTRICTA: Producto + Sinónimo de búsqueda + Característica clave + Material + Capacidad/Medida + Accesorio. SIN conectores vacíos ("de", "con", "el", "para"), SIN emojis, SIN signos de exclamación. Ej: Set 4 Tazas Jarro Mug Apilables Ceramica 285ml Rack Metal]
- **Categoría Sugerida Mercado Libre:** [Ruta exacta, ej: Hogar, Muebles y Jardín > Bazar y Cocina > ...]

**Atributos de Ficha Técnica Mercado Libre:**
- **Marca:** UTAMA DECO
- **Línea:** [Nombre de la línea o colección]
- **Modelo:** [Nombre de modelo comercial corto y distintivo acorde a UTAMA]
- **Diseño:** [Trama o acabado de superficie: ej. Texturizado geométrico, Liso, Acanalado, Retícula]
- **Forma:** [Silueta física: ej. Cilíndrica, Redonda, Rectangular, Orgánica]
- **Formato de venta:** [Unidad o Pack]
- **Unidades por pack:** [Número exacto inferido del producto o despiece. Ej: 1, 4, 6]
- **Color principal:** [Color predominante real observado en el producto]
- **Atributos adicionales:** [2 o 3 atributos clave para filtros laterales de ML: ej. Apto microondas, Apto lavavajillas, Incluye soporte apilador]

---

=== BLOQUE 4: DESCRIPCIÓN MERCADO LIBRE (TEXTO PLANO ESCANEABLE SIN HTML) ===

[TITULAR PRINCIPAL EN MAYÚSCULAS ORIENTADO A BENEFICIO Y USO]
Línea / Colección: [Nombre de la línea o colección UTAMA]

[Párrafo introductorio claro y persuasivo de 2-3 líneas destacando calidad, estética ${ctx.style} y utilidad práctica inmediata.]

DETALLES QUE HACEN LA DIFERENCIA
- [Beneficio Visual / Material]: [Redactado basándote en ${ctx.enrichment.argumentosVenta}].
- [Beneficio Práctico / Uso]: [Redactado basándote en ${ctx.feature}].
- [Proporción y Diseño]: [Por qué sus medidas (${ctx.dims}) son cómodas y funcionales para el uso diario].

CARACTERÍSTICAS TÉCNICAS Y EMBALAJE
- Producto: ${ctx.name}
- Línea / Colección: [Nombre de la línea o colección]
- Incluye: [Detalle exacto según DESPIECE TÉCNICO]
- Material: ${ctx.material}
- Medidas del Producto: ${ctx.dims}
- Peso Neto: ${ctx.input.weight} kg
- Medidas y Especificaciones del Embalaje: [Detalle exacto de medidas de caja/bulto, peso embalado y protección reforzada anti-impacto]
- Cuidados: [Instrucción breve de limpieza y mantenimiento]

SUGERENCIAS DE USO Y AMBIENTACIÓN
- [Idea concreta 1 de uso o ubicación en el hogar].
- [Idea concreta 2 de combinación o funcionalidad].

PREGUNTAS FRECUENTES
- ¿Emiten factura? Sí, emitimos Factura C, la cual se genera automáticamente según los datos fiscales cargados en tu cuenta de Mercado Libre al momento de realizar la compra.
- ¿Tienen stock disponible y cuándo despachan? Sí, si la publicación está activa tenemos stock disponible. Despachamos todos los pedidos en tiempo y forma dentro de las 24 hs hábiles.
- ¿Cómo llega embalado el producto? Despachamos cada pieza con doble protección anti-impacto y embalaje reforzado para asegurar que llegue intacto a cualquier punto del país.
- ¿Hacen envíos en el día (Flex)? Sí, comprando antes del horario de corte indicado en la publicación, recibís tu pedido en el día en CABA y zonas habilitadas de GBA.
- ¿Qué pasa si tengo algún inconveniente con mi compra? Contás con compra protegida y atención postventa directa por mensajería interna de Mercado Libre para resolver cualquier consulta al instante.

[Cierre limpio de conversión orientado a hacer clic en "Comprar ahora", sin mencionar sitios web externos, redes sociales ni descuentos por transferencia].`,
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