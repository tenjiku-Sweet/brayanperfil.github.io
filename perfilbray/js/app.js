/* ═══════════════════════════════════════════════════════════
   app.js — Portfolio Brayan
   Estructura:
   1. Cursor personalizado
   2. Canvas de estrellas
   3. Scroll Reveal (IntersectionObserver)
   4. Skill Bars animadas
   5. Playlist interactiva
   6. Oráculo del 6to Sentido
═══════════════════════════════════════════════════════════ */


/* ─── 1. CURSOR PERSONALIZADO ─── */
const cursor = document.getElementById('cursor');

// Mueve el cursor siguiendo el mouse
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 8 + 'px';
  cursor.style.top  = e.clientY - 8 + 'px';
});

// Agranda el cursor al pasar por elementos interactivos
const hoverTargets = document.querySelectorAll(
  'a, button, .fact-card, .interest-card, .track, .cat-card, .anime-card, .sense-orb'
);

hoverTargets.forEach((el) => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});


/* ─── 2. CANVAS DE ESTRELLAS ─── */
const canvas = document.getElementById('stars');
const ctx    = canvas.getContext('2d');
let stars    = [];

// Ajusta el canvas al tamaño de la ventana
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Crea las estrellas con propiedades aleatorias
function createStars() {
  stars = [];
  for (let i = 0; i < 180; i++) {
    stars.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.2,
      alpha: Math.random(),
      speed: Math.random() * 0.3 + 0.05,
      pulse: Math.random() * Math.PI * 2
    });
  }
}

// Dibuja y anima las estrellas en cada frame
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const t = Date.now() * 0.001;

  stars.forEach((s) => {
    // Parpadeo suave con función seno
    s.alpha = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.pulse));

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 245, 212, ${s.alpha * 0.6})`;
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

// Inicializar estrellas
resizeCanvas();
createStars();
drawStars();

// Re-crear al cambiar el tamaño de ventana
window.addEventListener('resize', () => {
  resizeCanvas();
  createStars();
});


/* ─── 3. SCROLL REVEAL ─── */
// Observa los elementos con clase .reveal
// y les agrega .visible cuando entran en viewport
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


/* ─── 4. SKILL BARS ANIMADAS ─── */
// Cuando .skills-wrap entra en pantalla,
// anima cada barra hasta su valor data-width
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
          // El CSS hace la transición, solo asignamos el ancho objetivo
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skills-wrap').forEach((wrap) => {
  skillObserver.observe(wrap);
});


/* ─── 5. PLAYLIST INTERACTIVA ─── */

// Lista de canciones
const tracks = [
  { num: '01', emoji: '🎸', title: 'R U Mine?',           artist: 'Arctic Monkeys', genre: 'Indie Rock'    },
  { num: '02', emoji: '🌹', title: 'Brooklyn Baby',          artist: 'Lana Del Rey',   genre: 'Dream Pop'     },
  { num: '03', emoji: '🔥', title: 'Recorde',                 artist: 'Milo J',         genre: 'Trap Argento'  },
  { num: '04', emoji: '🐰', title: 'BOKeTE',     artist: 'Bad Bunny',      genre: 'Reggaeton'     },
  { num: '05', emoji: '🌙', title: 'td care abour us',          artist: 'Michael Jackson',genre: 'Rey del Pop '   },
  { num: '06', emoji: '⚡', title: '505',     artist: 'Arctic Monkeys', genre: 'Indie Rock'    },
  { num: '07', emoji: '🌺', title: 'Summertime Sadness',   artist: 'Lana Del Rey',   genre: 'Dream Pop'     },

];


const playlistEl = document.getElementById('playlist');

// Renderiza cada canción como un elemento del DOM
tracks.forEach((track) => {
  const div = document.createElement('div');
  div.className = 'track';

  div.innerHTML = `
    <span class="track-num">${track.num}</span>
    <span class="track-emoji">${track.emoji}</span>
    <div class="track-info">
      <div class="track-title">${track.title}</div>
      <div class="track-artist">${track.artist}</div>
    </div>
    <span class="track-genre">${track.genre}</span>
    <div class="bars">
      <div class="bar" style="height:6px"></div>
      <div class="bar" style="height:12px"></div>
      <div class="bar" style="height:4px"></div>
    </div>
  `;

  // Al hacer click, marca la canción como activa
  div.addEventListener('click', () => {
    // Quita .active de todas
    document.querySelectorAll('.track').forEach((t) => t.classList.remove('active'));
    // Agrega .active a la seleccionada
    div.classList.add('active');
  });

  playlistEl.appendChild(div);
});


/* ─── 6. ORÁCULO DEL 6TO SENTIDO ─── */

// Mensajes del oráculo
const oracleMessages = [
  '// Algo bueno está por llegar... pronto.',
  '// Alguien está pensando en ti ahora mismo.',
  '// Una puerta se cerrará para abrir una mejor.',
  '// Tu esfuerzo de hoy no pasará desapercibido.',
  '// El universo está alineado contigo hoy.',
  '// Una persona nueva cambiará algo en ti.',
  '// Lo que sientes que va a pasar... va a pasar.',
];

const orb       = document.getElementById('orb');
const oracleMsg = document.getElementById('oracleMsg');

orb.addEventListener('click', () => {
  // Elige un mensaje aleatorio
  const msg = oracleMessages[Math.floor(Math.random() * oracleMessages.length)];

  // Efecto: borra y vuelve a mostrar
  oracleMsg.textContent = '';
  oracleMsg.style.opacity = '0';

  setTimeout(() => {
    oracleMsg.textContent = msg;
    oracleMsg.style.transition = 'opacity 0.6s';
    oracleMsg.style.opacity = '1';
  }, 300);
});
