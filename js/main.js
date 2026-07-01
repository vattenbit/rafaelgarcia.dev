/* ============================================================
   Rafael García Álvarez — Portfolio
   Carga de datos, i18n (ES/EN), tema claro/oscuro e interacciones
   ============================================================ */

/* ---------- Estado ---------- */
let lang = localStorage.getItem('lang') || (navigator.language || 'es').slice(0, 2);
if (lang !== 'en') lang = 'es';

let data = {}; // { profile, skills, experience, education, courses, projects }

/* ---------- Diccionario de textos de UI ---------- */
const I18N = {
  es: {
    'nav.about': 'Sobre mí',
    'nav.skills': 'Skills',
    'nav.experience': 'Experiencia',
    'nav.education': 'Formación',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'hero.greeting': 'Hola, soy',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.contact': 'Contacto',
    'hero.cta.cv': 'Descargar CV',
    'section.about': 'Sobre mí',
    'section.skills': 'Skills',
    'section.experience': 'Experiencia',
    'section.education': 'Formación',
    'section.courses': 'Cursos y certificaciones',
    'section.projects': 'Proyectos',
    'section.contact': 'Contacto',
    'contact.text': '¿Hablamos? Escríbeme o encuéntrame en mis redes.',
    'label.present': 'Actualidad',
    'label.grade': 'Nota',
    'label.demo': 'Ver web',
    'label.repo': 'Repositorio',
    'workplace.hybrid': 'Híbrido',
    'workplace.onsite': 'Presencial',
    'workplace.remote': 'Remoto',
    'unit.year': 'año',
    'unit.years': 'años',
    'unit.month': 'mes',
    'unit.months': 'meses',
    'error.load': 'No se pudieron cargar los datos. Sirve el sitio con un servidor local (p. ej. "python3 -m http.server") en lugar de abrir el fichero directamente.'
  },
  en: {
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.greeting': "Hi, I'm",
    'hero.cta.projects': 'View projects',
    'hero.cta.contact': 'Contact',
    'hero.cta.cv': 'Download CV',
    'section.about': 'About me',
    'section.skills': 'Skills',
    'section.experience': 'Experience',
    'section.education': 'Education',
    'section.courses': 'Courses & certifications',
    'section.projects': 'Projects',
    'section.contact': 'Contact',
    'contact.text': "Let's talk. Drop me a line or find me on my socials.",
    'label.present': 'Present',
    'label.grade': 'Grade',
    'label.demo': 'Live site',
    'label.repo': 'Repository',
    'workplace.hybrid': 'Hybrid',
    'workplace.onsite': 'On-site',
    'workplace.remote': 'Remote',
    'unit.year': 'yr',
    'unit.years': 'yrs',
    'unit.month': 'mo',
    'unit.months': 'mos',
    'error.load': 'Could not load data. Serve the site with a local server (e.g. "python3 -m http.server") instead of opening the file directly.'
  }
};

const ui = (key) => (I18N[lang] && I18N[lang][key]) || key;

/* Devuelve el valor localizado: si es un objeto {es, en} coge el idioma actual */
const t = (v) => {
  if (v && typeof v === 'object' && !Array.isArray(v)) return v[lang] ?? v.es ?? '';
  return v ?? '';
};

/* ---------- Iconos sociales (SVG inline) ---------- */
const ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.83 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.08.8 2.18v3.24c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64z"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 6.5l9 6 9-6"/></svg>'
};

/* ---------- Utilidades ---------- */
const el = (id) => document.getElementById(id);

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/* Formatea "YYYY-MM" -> "jun 2025" según el idioma */
function formatMonth(str) {
  if (!str) return ui('label.present');
  const [y, m] = str.split('-').map(Number);
  const d = new Date(y, (m || 1) - 1, 1);
  const label = new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-ES', {
    month: 'short', year: 'numeric'
  }).format(d);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/* Duración entre dos fechas "YYYY-MM" (end null = ahora) */
function duration(start, end) {
  const [sy, sm] = start.split('-').map(Number);
  const e = end ? end.split('-').map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
  let months = (e[0] - sy) * 12 + (e[1] - sm) + 1;
  if (months < 1) months = 1;
  const y = Math.floor(months / 12);
  const mo = months % 12;
  const parts = [];
  if (y) parts.push(`${y} ${y === 1 ? ui('unit.year') : ui('unit.years')}`);
  if (mo) parts.push(`${mo} ${mo === 1 ? ui('unit.month') : ui('unit.months')}`);
  return parts.join(' ');
}

/* ---------- Render de secciones ---------- */
function renderProfile() {
  const p = data.profile;
  el('hero-role').textContent = t(p.role);
  el('hero-tagline').textContent = t(p.tagline);
  el('about-text').textContent = t(p.summary);

  const avatar = el('hero-avatar');
  if (p.photo) {
    avatar.src = p.photo;
  } else {
    avatar.closest('.hero-photo').style.display = 'none';
  }

  const socialHtml = p.social
    .filter((s) => s.url)
    .map((s) => `<a class="social-link" href="${escapeHtml(s.url)}" target="_blank" rel="noopener" aria-label="${escapeHtml(s.network)}" title="${escapeHtml(s.network)}">${ICONS[s.icon] || ''}</a>`)
    .join('');
  el('hero-social').innerHTML = socialHtml;
  el('contact-social').innerHTML = socialHtml;
}

function renderSkills() {
  el('skills-grid').innerHTML = data.skills.map((cat) => `
    <div class="skill-card reveal">
      <h3>${escapeHtml(t(cat.category))}</h3>
      <div class="chips">
        ${cat.skills.map((s) => `<span class="chip">${escapeHtml(t(s))}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderExperience() {
  el('experience-list').innerHTML = data.experience.map((job) => {
    const first = job.roles[0];
    const last = job.roles[job.roles.length - 1];
    const total = duration(last.start, first.end);
    const badge = job.current ? `<span class="tl-badge">${ui('label.present')}</span>` : '';
    const roles = job.roles.map((r) => `
      <div class="tl-role">
        <div class="tl-role-title">${escapeHtml(r.title)}</div>
        <div class="tl-role-dates">${formatMonth(r.start)} — ${r.end ? formatMonth(r.end) : ui('label.present')} · ${duration(r.start, r.end)}</div>
        <ul class="tl-list">
          ${r.highlights.map((h) => `<li>${escapeHtml(t(h))}</li>`).join('')}
        </ul>
      </div>
    `).join('');
    return `
      <div class="timeline-item reveal">
        <div class="timeline-card">
          <div class="tl-head">
            <div class="tl-company">${escapeHtml(job.company)}${badge}</div>
            <div class="tl-meta">${escapeHtml(job.location)} · ${ui('workplace.' + job.workplace)} · ${total}</div>
          </div>
          ${roles}
        </div>
      </div>
    `;
  }).join('');
}

function renderEducation() {
  el('education-list').innerHTML = data.education.map((e) => `
    <div class="timeline-item reveal">
      <div class="timeline-card">
        <div class="tl-head">
          <div class="tl-company">${escapeHtml(e.institution)}</div>
          <div class="tl-meta">${escapeHtml(e.start)} — ${escapeHtml(e.end)}</div>
        </div>
        <div class="tl-role">
          <div class="tl-role-title">${escapeHtml(t(e.degree))}</div>
          <div class="tl-role-dates">${escapeHtml(t(e.field))}</div>
          ${e.grade ? `<div class="tl-grade">${ui('label.grade')}: ${escapeHtml(e.grade)}</div>` : ''}
          ${e.note ? `<div class="tl-note">${escapeHtml(t(e.note))}</div>` : ''}
          ${e.activities && e.activities.length ? `<ul class="tl-list">${e.activities.map((a) => `<li>${escapeHtml(t(a))}</li>`).join('')}</ul>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function renderCourses() {
  el('courses-list').innerHTML = data.courses.map((c) => `
    <div class="course-card reveal">
      <div class="course-name">${escapeHtml(t(c.name))}</div>
      ${c.issuer ? `<div class="course-issuer">${escapeHtml(c.issuer)}</div>` : ''}
    </div>
  `).join('');
}

function renderProjects() {
  el('projects-list').innerHTML = data.projects.map((p) => {
    const media = p.image
      ? `<div class="project-media"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.parentNode.textContent='${escapeHtml(p.name)}'"></div>`
      : `<div class="project-media">${escapeHtml(p.name)}</div>`;
    const links = [];
    if (p.links && p.links.demo) links.push(`<a href="${escapeHtml(p.links.demo)}" target="_blank" rel="noopener">${ui('label.demo')} ↗</a>`);
    if (p.links && p.links.repo) links.push(`<a href="${escapeHtml(p.links.repo)}" target="_blank" rel="noopener">${ui('label.repo')} ↗</a>`);
    return `
      <article class="project-card reveal">
        ${media}
        <div class="project-body">
          <h3 class="project-title">${escapeHtml(p.name)}</h3>
          ${p.tagline ? `<div class="project-tagline">${escapeHtml(t(p.tagline))}</div>` : ''}
          <p class="project-desc">${escapeHtml(t(p.description))}</p>
          <div class="project-tech">
            ${(p.tech || []).map((tech) => `<span class="chip">${escapeHtml(t(tech))}</span>`).join('')}
          </div>
          <div class="project-links">${links.join('')}</div>
        </div>
      </article>
    `;
  }).join('');
}

/* Aplica los textos de UI marcados con [data-i18n] */
function applyStaticI18n() {
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = ui(node.getAttribute('data-i18n'));
  });
  document.documentElement.lang = lang;
  el('lang-label').textContent = lang === 'es' ? 'EN' : 'ES';
}

function renderAll() {
  applyStaticI18n();
  renderProfile();
  renderSkills();
  renderExperience();
  renderEducation();
  renderCourses();
  renderProjects();
  observeReveals();
}

/* ---------- Animaciones al hacer scroll ---------- */
let revealObserver;
function observeReveals() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((n) => n.classList.add('visible'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll('.reveal:not(.visible)').forEach((n) => revealObserver.observe(n));
}

/* ---------- Tema claro / oscuro ---------- */
function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = saved || (prefersLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

/* ---------- Idioma ---------- */
function toggleLang() {
  lang = lang === 'es' ? 'en' : 'es';
  localStorage.setItem('lang', lang);
  renderAll();
}

/* ---------- Menú móvil ---------- */
function initNav() {
  const toggle = el('nav-toggle');
  const nav = el('nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

/* ---------- Carga de datos ---------- */
async function loadData() {
  const files = ['profile', 'skills', 'experience', 'education', 'courses', 'projects'];
  const results = await Promise.all(
    files.map((f) => fetch(`data/${f}.json`).then((r) => {
      if (!r.ok) throw new Error(`${f}: ${r.status}`);
      return r.json();
    }))
  );
  files.forEach((f, i) => { data[f] = results[i]; });
}

/* ---------- Init ---------- */
async function init() {
  initTheme();
  initNav();
  el('theme-toggle').addEventListener('click', toggleTheme);
  el('lang-toggle').addEventListener('click', toggleLang);
  el('year').textContent = new Date().getFullYear();

  try {
    await loadData();
    renderAll();
  } catch (err) {
    console.error(err);
    const about = el('about-text');
    if (about) about.textContent = ui('error.load');
    document.querySelectorAll('.reveal').forEach((n) => n.classList.add('visible'));
  }
}

document.addEventListener('DOMContentLoaded', init);
