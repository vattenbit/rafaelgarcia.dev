# CLAUDE.md

Guía para trabajar en este repositorio con Claude Code.

## Proyecto

Web personal de **Rafael García Álvarez** (`rafaelgarcia.dev`): un sitio para mostrar el
currículum, las redes sociales y un portfolio de proyectos.

Objetivos:

- **Sitio estático**: solo HTML, CSS y JavaScript vanilla. Sin frameworks ni
  build step obligatorio. Debe poder servirse desde cualquier hosting estático
  (GitHub Pages, Netlify, Cloudflare Pages, etc.) abriendo los ficheros tal cual.
- **Interacciones y animaciones** con JavaScript y CSS (scroll reveal,
  transiciones suaves, cambio de tema, etc.).
- **Rápido, accesible y responsive**: mobile-first, buen rendimiento en
  Lighthouse y HTML semántico.

## Secciones de la web

1. **Hero / presentación** — nombre, rol y llamada a la acción.
2. **Sobre mí / CV** — resumen profesional, experiencia, formación y skills.
   Incluir enlace para descargar el CV en PDF.
3. **Redes sociales** — enlaces a GitHub, LinkedIn, X/Twitter, email, etc.
4. **Portfolio** — tarjetas de proyectos con imagen, descripción, tecnologías y
   enlaces (demo y repositorio).
5. **Contacto** — formulario o enlace directo por email.

## Estructura de ficheros propuesta

```
/
├── index.html          # Página principal (una sola página, secciones ancladas)
├── css/
│   ├── styles.css      # Estilos base y layout
│   └── theme.css       # Variables de color / modo claro-oscuro (opcional)
├── js/
│   └── main.js         # Interacciones: menú, animaciones, tema
├── assets/
│   ├── img/            # Imágenes y capturas de proyectos
│   ├── icons/          # Iconos (SVG preferido)
│   └── cv.pdf          # Currículum descargable
├── data/
│   └── projects.json   # Datos de los proyectos (para renderizar el portfolio)
└── README.md
```

`data/projects.json` permite añadir proyectos sin tocar el HTML: `main.js` los
lee y genera las tarjetas del portfolio dinámicamente.

## Convenciones

- **HTML semántico**: usar `<header>`, `<nav>`, `<main>`, `<section>`,
  `<article>`, `<footer>`. Cada sección con su `id` para navegación por anclas.
- **CSS**: usar variables CSS (`:root { --color-... }`) para colores y
  espaciados. Layout con Flexbox/Grid. Mobile-first con `min-width` en las
  media queries. Preferir `rem`/`em` sobre `px`.
- **JavaScript**: vanilla, módulos ES (`type="module"`) si se divide en varios
  ficheros. Sin dependencias externas salvo justificación clara. Usar
  `IntersectionObserver` para animaciones al hacer scroll.
- **Accesibilidad**: contraste suficiente, `alt` en imágenes, foco visible,
  navegación por teclado, respetar `prefers-reduced-motion`.
- **Rendimiento**: imágenes optimizadas (WebP/AVIF + `loading="lazy"`), SVG para
  iconos, CSS/JS mínimos.

## Desarrollo local

Al ser estático, basta con abrir `index.html` en el navegador. Para servirlo con
un servidor local (recomendado si se usan módulos ES o `fetch` de JSON):

```bash
python3 -m http.server 8000
# o
npx serve .
```

Luego abrir http://localhost:8000.

## Notas para Claude

- Mantener el sitio **sin build step**: no introducir Node/bundlers a menos que
  se pida explícitamente.
- Sin frameworks (React, Vue, etc.) ni librerías CSS pesadas: es un proyecto
  vanilla por diseño.
- Priorizar código legible y comentado en español, acorde a las preferencias del
  autor.
