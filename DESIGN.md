# Tu Casa · Sistema de diseño

Documento fuente para todo lo visual del proyecto. Cualquier módulo nuevo (publicaciones, clientes, interesados, reportes) toma estos tokens y reglas antes de inventar estilos propios.

## 1. Concepto

**Modernismo boliviano, visto desde un plano.**

Tu Casa es una herramienta de gestión inmobiliaria para agencias bolivianas. La identidad no recurre a fotos de fachadas ni a la estética genérica de panel administrativo. Toma dos materiales del oficio: el plano arquitectónico y la luz cálida del trópico.

- El plano aporta estructura, precisión y confianza técnica. Se dibuja con líneas finas, medidas y nombres de espacio en español.
- La luz aporta cercanía. Aparece como un sol ocre, no como degradado decorativo.
- El verde profundo funciona como el color de la casa y de la marca. La piedra caliza queda para el trabajo diario, porque reduce fatiga en jornadas largas.
- La tipografía editorial da peso a los momentos importantes (bienvenida, títulos de sección) y deja el resto en una sans neutra y legible.

La pieza memorable es el plano de la vivienda en el acceso. Todo lo demás se mantiene quieto para que esa pieza respire.

## 2. Paleta

Los valores viven en `src/app/globals.css` como variables CSS. Los componentes usan tokens semánticos, nunca hex directos.

### Tema claro

| Token | Hex | OKLCH | Uso |
| --- | --- | --- | --- |
| `--canvas` | `#F1F2EA` | `oklch(95.8% 0.011 112.4)` | Fondo general |
| `--surface` | `#FBFBF7` | `oklch(98.7% 0.005 106.5)` | Campos, tarjetas, superficies |
| `--ink` | `#18231D` | `oklch(24.3% 0.019 160.7)` | Texto principal |
| `--ink-soft` | `#5E665F` | `oklch(50.1% 0.015 149.0)` | Texto secundario |
| `--ink-faint` | `#666D66` | `oklch(52.6% 0.014 145.4)` | Texto auxiliar, placeholders |
| `--primary` | `#1E4B38` | `oklch(37.5% 0.060 163.3)` | Acción principal, enlaces |
| `--primary-strong` | `#14382A` | `oklch(31.0% 0.049 165.1)` | Hover de acción principal |
| `--primary-soft` | `#DCE8DF` | `oklch(91.9% 0.018 153.5)` | Fondos de estado positivo |
| `--accent` | `#D2922F` | `oklch(70.7% 0.134 73.4)` | Sol, detalles de marca |
| `--accent-strong` | `#8A5A12` | `oklch(50.9% 0.103 70.8)` | Texto sobre `accent-soft` |
| `--accent-soft` | `#F3E2BC` | `oklch(91.7% 0.053 86.8)` | Etiquetas de administración |
| `--line` | `#D7D9CE` | `oklch(88.1% 0.015 115.1)` | Bordes y divisores |
| `--line-strong` | `#B9BDB1` | `oklch(79.2% 0.017 121.8)` | Bordes con énfasis |
| `--danger` | `#A93226` | `oklch(49.5% 0.157 29.5)` | Errores |
| `--danger-soft` | `#F7E4E0` | `oklch(93.3% 0.022 31.8)` | Fondo de error |
| `--focus` | `#B97A1F` | `oklch(63.1% 0.126 70.2)` | Anillo de foco |
| `--brand-field` | `#1B3B2D` | `oklch(32.3% 0.046 163.5)` | Panel de marca del acceso |
| `--brand-ink` | `#F1EEE2` | `oklch(94.8% 0.016 95.2)` | Texto sobre panel de marca |
| `--brand-accent` | `#E3B45C` | `oklch(79.5% 0.119 81.3)` | Sol del plano |

### Tema oscuro

Sigue `prefers-color-scheme: dark`. El panel verde de marca no cambia; el área de trabajo sí.

| Token | Hex | OKLCH |
| --- | --- | --- |
| `--canvas` | `#0F1713` | `oklch(19.5% 0.014 163.0)` |
| `--surface` | `#16211B` | `oklch(23.5% 0.019 160.6)` |
| `--surface-raised` | `#1B2821` | `oklch(26.2% 0.022 160.8)` |
| `--ink` | `#ECEFE6` | `oklch(94.7% 0.012 121.7)` |
| `--ink-soft` | `#A3ADA4` | `oklch(73.7% 0.017 148.3)` |
| `--primary` | `#8FC3A7` | `oklch(77.3% 0.068 160.8)` |
| `--primary-soft` | `#1E3329` | `oklch(30.0% 0.033 163.0)` |
| `--accent` | `#E0B15A` | `oklch(78.6% 0.118 81.0)` |
| `--line` | `#2A3830` | `oklch(32.5% 0.023 159.7)` |

Reglas de color:

- El verde no se usa como fondo de bloques grandes fuera del acceso. En el panel, el color se reserva para acciones, estados y enlaces.
- El ocre es un acento escaso: sol del plano, etiqueta de administración, foco. No se usa en botones principales.
- Ningún estado se comunica solo con color. Siempre hay texto o forma además del tono.
- No se inventan degradados de fondo. La profundidad viene de bordes, contraste y composición.

## 3. Tipografía

| Rol | Familia | Variable | Pesos |
| --- | --- | --- | --- |
| Display | Fraunces | `--font-fraunces` (`font-display`) | 300, 400 |
| Interfaz y cuerpo | Instrument Sans | `--font-instrument` (`font-sans`) | 400, 500, 600 |

Fraunces se usa en titulares y nombres de sección. Instrument Sans se usa en formularios, datos, navegación y texto corrido. No se agrega una tercera familia.

Escala:

| Token visual | Tamaño | Uso |
| --- | --- | --- |
| `text-xs` | 12 px | Pie legal, metadatos |
| `text-sm` | 14 px | Etiquetas, ayudas, tabla |
| `text-base` | 16 px | Cuerpo |
| `text-lg` | 18 px | Entradilla |
| `text-xl` | 20 px | Título de tarjeta |
| `2.1rem` a `2.5rem` | 34 a 40 px | Título de formulario |
| `clamp(2.4rem, 5vw, 3.6rem)` | 38 a 58 px | Saludo de panel |
| `clamp(2.35rem, 4.4vw, 4.5rem)` | 38 a 72 px | Titular del acceso |

Reglas:

- Titulares en Fraunces con `font-light`, tracking entre `-0.02em` y `-0.035em` y `line-height` de 1.02 a 1.1.
- Cuerpo con `line-height` 1.6 y longitud máxima de 68 caracteres.
- No se usan mayúsculas sostenidas como etiqueta decorativa.
- No se acentúa una sola palabra de un titular con otro color, cursiva o peso. El énfasis se logra con tamaño y posición.
- Los números y códigos usan Instrument Sans; no se introduce una monoespaciada salvo para datos técnicos futuros.

## 4. Espacio, radio y profundidad

Escala de espacio: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px. En Tailwind equivalen a `1, 2, 3, 4, 6, 8, 12, 16, 24, 32`.

Radios:

- Campos y botones: `rounded-field` (8 px).
- Superficies: `rounded-surface` (20 px).
- Etiquetas de estado: `rounded-full`.
- Elementos del plano: sin radio, porque representan arquitectura.

Sombras:

- Superficie: `0 1px 0 rgba(24,35,29,0.04)`. Es una línea de apoyo, no una sombra difusa.
- Campos: `inset 0 1px 0 rgba(24,35,29,0.03)`.
- No se usa la sombra genérica `0 4px 12px rgba(0,0,0,.1)` ni sombras de tarjetas flotantes.

Jerarquía de superficies:

1. `canvas`: fondo de la página.
2. `surface`: tarjeta o campo.
3. `surface-raised`: solo para contenido que debe separarse de una superficie, por ejemplo un menú futuro.

## 5. Componentes

### Logo

`src/shared/presentation/brand/logo.tsx`

- Símbolo de techo y puerta en trazo de 1.7 px. La puerta usa `--brand-accent`.
- Wordmark en Fraunces, minúsculas, `tracking-[-0.02em]`.
- Sobre verde: `tone="brand"`. Sobre claro u oscuro: `tone="ink"`.
- Área mínima de respeto: la altura del símbolo a cada lado.

### Plano de vivienda

`src/shared/presentation/brand/house-plan.tsx`

- Vista de planta con sala, comedor, cocina y patio. Trazos finos, medidas y norte. Solo se muestra en escritorio, desde 1024 px.
- Es decorativo: `aria-hidden="true"`.
- Aparece una vez por pantalla. No se repite como patrón de fondo en todas las páginas.
- Animación de dibujo de 2.4 s al cargar el acceso. Con movimiento reducido se muestra completo y quieto.

### Botón

`src/shared/presentation/ui/button.tsx`

| Variante | Fondo | Texto | Borde | Hover |
| --- | --- | --- | --- | --- |
| `primary` | `--primary` | `--on-primary` | ninguno | `--primary-strong` |
| `outline` | transparente | `--ink` | `--line-strong` | borde y texto `--primary` |
| `ghost` | transparente | `--ink-soft` | ninguno | texto `--ink` |

- Altura mínima táctil 44 px en móvil. En escritorio, 40 a 44 px.
- Deshabilitado: opacidad 55 %, cursor no permitido.
- El foco visible es el anillo global de 2 px con offset 3 px.
- El texto del botón nombra la acción: "Entrar al panel", "Cerrar sesión". No se agrega una flecha decorativa.

### Campo

`src/shared/presentation/ui/field.tsx`

- Etiqueta visible arriba, nunca solo placeholder.
- Error con `aria-invalid` y `aria-describedby`, además de texto rojo.
- Ayuda opcional debajo del campo.
- Borde `--line`; foco con borde `--primary` y anillo suave `--focus` al 35 %.
- Acción secundaria dentro del campo solo si es necesaria, como mostrar u ocultar contraseña.

### Superficie

`src/shared/presentation/ui/surface.tsx`

- Fondo `--surface`, borde `--line`, radio 20 px, padding 24 px.
- Encabezado de superficie separado con divisor `--line`.
- No se anidan más de dos superficies.

### Etiquetas de estado

- Rol y estado activo: fondo `--primary-soft`, texto `--primary`, punto de 6 px.
- Solo administración: fondo `--accent-soft`, texto `--accent-strong`.
- Inactivo: texto `--ink-faint`, punto `--line-strong`.

### Alertas

- Error de formulario: fondo `--danger-soft`, borde izquierdo de 2 px `--danger`, texto `--danger`, `role="alert"`.
- No se usan íconos de error sin texto.

## 6. Composición

### Acceso

- Escritorio desde 1024 px: dos columnas, 56 % panel de marca y 44 % formulario.
- El panel de marca contiene logo, titular, entradilla, plano y una línea de contexto. El formulario se alinea a la izquierda dentro de un ancho máximo de 432 px.
- Entre 640 y 1023 px: una columna. El panel verde se reduce a una cabecera compacta de 36 svh con titular y sin plano; el formulario va debajo, alineado a la misma columna de 432 px.
- Desde 360 px: padding lateral de 24 px, titular de 38 px, botón de ancho completo.
- El formulario nunca se centra en una tarjeta flotante sobre gris. Vive directamente sobre el fondo de trabajo.

### Navegación interna (sidebar)

- Escritorio: sidebar fija de 288 px, fondo `--surface`, borde derecho `--line`. El contenido trabaja con 1152 px máximos y padding de 24 px.
- Estructura: logo, sección General (Panel), sección Gestión con el enlace directo **Publicaciones** y sus subrutas por rol (Solicitar publicación / Por aprobar / Administrar), sección Sitio (Vitrina pública), y al pie usuario, rol y cierre de sesión.
- Los enlaces permitidos dependen del rol; nunca se muestran rutas que el backend vaya a rechazar. El enlace activo usa `--primary-soft` y `aria-current="page"`.
- Móvil: barra superior de 64 px con botón de menú, logo y acceso al sitio. El menú abre un drawer de 320 px con overlay, foco en el botón de cierre, cierre con Escape y bloqueo del scroll de fondo.
- El sidebar es el único lugar de navegación interna; las páginas no repiten cabecera ni menú.

### Panel

- Ancho máximo 1152 px, padding lateral de 24 px.
- Saludo editorial en Fraunces y luego una rejilla de dos columnas: cuenta y roles.
- Accesos rápidos a Publicaciones según rol y tarjetas informativas de la agencia.
- En móvil, las superficies se apilan; el cierre de sesión vive en el drawer, no en la página.

### Landing

- Sitio público separado del panel: la landing no enlaza a rutas internas ni usa el vocabulario de gestión (panel, aprobación, publicación, roles). El acceso del personal queda solo en `/login`, por URL directa.
- Cabecera fija de 80 px con logo, anclas a Propiedades, Cómo funciona y Ciudades, y una sola acción: Ver propiedades. En móvil se ocultan las anclas intermedias; la acción permanece.
- Héroe verde de marca a dos columnas. Titular en Fraunces de 57 a 91 px con dos líneas cortas, entradilla de 18 px y dos acciones: Ver propiedades disponibles y Cómo pedir información. La pieza memorable es el perfil de alturas: una sección topográfica con Santa Cruz, Tarija y La Paz, sus altitudes y una línea que se dibuja una sola vez.
- Banda de confianza de tres columnas tipográficas con borde superior: precio a la vista, ficha revisada y respuesta local. Sin tarjetas, íconos ni numeración.
- La vitrina es un catálogo editorial, no una rejilla de tarjetas: filas con borde superior, glifo arquitectónico, título, descripción breve y precio alineado a la derecha. Los filtros de ciudad son botones de texto con subrayado ocre; el de operación es un `select` nativo. Cada ficha cierra con la acción Solicitar información.
- Cada propiedad usa un glifo de trazo según su título: casa, departamento, oficina, local o terreno. El glifo identifica, no decora; nunca sustituye el título.
- "Cómo funciona" es la secuencia del comprador (explorar, pedir información, coordinar la visita) y por eso usa numeración. "Ciudades" usa tres columnas tipográficas con altitud y una línea de carácter local.
- El cierre repite el verde de marca y una sola acción: ver propiedades disponibles. No ofrece acceso al panel.
- Una sola secuencia de entrada por carga (titular y perfil de alturas). Las tarjetas y secciones no se animan al aparecer. Los filtros no usan transiciones de más de 150 ms.
- Los filtros y el atlas comparten estado en `LandingPage`; el atlas desplaza a la vitrina con `scrollIntoView` y respeta `prefers-reduced-motion`.

## 7. Movimiento

- Una sola secuencia de entrada por pantalla: el plano se dibuja y el contenido sube 14 px con opacidad.
- Duración: 2.4 s para el plano, 720 ms para texto y formulario, con 120 ms de desfase.
- Hover y cambio de estado: 150 ms. No se anima cada tarjeta al aparecer.
- `prefers-reduced-motion: reduce` desactiva todas las animaciones de entrada y deja el plano completo.
- No hay movimiento automático en bucle.

## 8. Accesibilidad

- Contraste mínimo AA: texto normal 4.5:1, texto grande 3:1. La paleta está elegida para cumplirlo en ambos temas.
- Foco visible global: `outline: 2px solid var(--focus); outline-offset: 3px`.
- Un solo `h1` por página. Jerarquía de encabezados sin saltos.
- Formularios con `label` asociado, `autocomplete` correcto y mensajes de error anunciados con `role="alert"`.
- El botón de mostrar contraseña usa `aria-pressed` y nombre accesible.
- Objetivos táctiles de al menos 44 × 44 px.
- El color nunca es el único indicador de estado.
- El plano y los adornos llevan `aria-hidden="true"`.
- Orden de tabulación natural: logo, campos, acción, ayuda. No se usan `tabIndex` positivos.

## 9. Copy

- Español de Bolivia, trato de tú, sentence case.
- Verbos directos y específicos: "Entrar al panel", no "Acceder".
- Sin signos de exclamación, sin promesas vagas, sin "soluciones integrales".
- Los errores explican qué pasó y qué hacer, sin disculparse.
- La landing habla al comprador. El vocabulario de gestión (panel, aprobación, publicación, roles) vive solo en la app interna.
- Los datos inventados no se presentan como reales. Correos, oficinas y cifras se confirman antes de publicarse.

## 10. Uso en módulos futuros

1. Importar tokens desde `globals.css`; no escribir hex en componentes.
2. Reutilizar `Button`, `Field`, `Surface`, `Logo` y `HousePlan` antes de crear variantes.
3. Mantener una sola pieza memorable por pantalla. En el acceso es el plano de vivienda; en la landing, el perfil de alturas; en publicaciones puede ser la galería; en clientes, la tabla.
4. Añadir estados vacíos con una acción clara, no con ilustraciones decorativas.
5. Toda pantalla nueva se valida a 360, 768 y 1440 px, con teclado y con movimiento reducido.
6. Si un módulo necesita un color nuevo, primero se evalúa si un token existente cubre el caso. Si no, se agrega al sistema en este documento y en `globals.css`, no en el componente.

## 11. Archivos de referencia

- `src/app/globals.css`: tokens, tema oscuro, foco, animaciones.
- `src/app/layout.tsx`: fuentes, metadatos, fondo base.
- `src/shared/presentation/brand/logo.tsx`: marca.
- `src/shared/presentation/brand/house-plan.tsx`: plano.
- `src/shared/presentation/ui/button.tsx`: acciones.
- `src/shared/presentation/ui/field.tsx`: campos.
- `src/shared/presentation/ui/surface.tsx`: superficies.
- `src/app/login/page.tsx`: composición del acceso.
- `src/modules/access-control/presentation/components/`: formulario, panel y roles.
- `src/modules/landing/presentation/components/landing-page.tsx`: composición de la landing.
- `src/modules/landing/presentation/components/landing.module.css`: animación de entrada y trazo del perfil.
- `src/modules/landing/presentation/landing-content.ts`: perfiles de las tres sucursales.
- `src/modules/landing/presentation/components/property-glyph.tsx`: glifos por tipo de propiedad.
