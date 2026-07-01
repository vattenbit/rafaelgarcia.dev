# rafaelgarcia.dev

Web personal de **Rafael García Álvarez** — CV, redes sociales y portfolio de proyectos.

Sitio estático (HTML, CSS y JavaScript vanilla, sin build step ni frameworks),
bilingüe (ES/EN) y con tema claro/oscuro.

## Características

- 🌐 Bilingüe español / inglés con selector de idioma
- 🌓 Tema claro y oscuro (recuerda la preferencia)
- ✨ Animaciones al hacer scroll (`IntersectionObserver`)
- 📱 Diseño responsive, mobile-first
- 🗂️ Contenido servido desde ficheros JSON en `data/`

## Desarrollo local

Al usar `fetch` para cargar los JSON, necesita un servidor local:

```bash
python3 -m http.server 8000
# o
npx serve .
```

Luego abrir http://localhost:8000.

## Estructura

```
index.html        Página principal
css/styles.css    Estilos y temas
js/main.js        Carga de datos, i18n, tema e interacciones
data/*.json       Perfil, skills, experiencia, formación, cursos y proyectos
assets/           Imágenes
```
