/* =========================================================
   DADOS DO SITE â€” edite aqui sem mexer no resto do cÃ³digo
   ========================================================= */

window.CASA = {
  /* ---------- INSCRIÃ‡Ã•ES ----------
     abertas: true  â†’ os botÃµes levam para o FormulÃ¡rio do Google de cada unidade
     abertas: false â†’ o site mostra "InscriÃ§Ãµes encerradas"
     Cole o link do formulÃ¡rio de cada unidade em `links`.            */
  inscricoes: {
    abertas: false,
    links: {
      'beira-linha': '', // ex.: 'https://forms.gle/xxxxxxxx'
      'sao-pedro': ''
    }
  },

  contato: {
    whatsapp: '5521966907209',
    instagram: 'https://www.instagram.com/casadainovacaoteresopolis/',
    instagramUser: '@casadainovacaoteresopolis',
    facebook: 'https://www.facebook.com/casadainovacaoteresopolis/'
  },

  unidades: {
    'beira-linha': {
      nome: 'Beira Linha',
      selo: 'Unidade sede',
      endereco: 'Rua Beira Linha, 329',
      cidade: 'TeresÃ³polis Â· RJ',
      maps: 'https://www.google.com/maps/search/?api=1&query=Rua+Beira+Linha+329+Teresopolis+RJ',
      embed: 'https://www.google.com/maps?q=Rua+Beira+Linha,+329,+Teres%C3%B3polis+-+RJ&output=embed',
      telefone: '(21) 96690-7209',
      tel: '+5521966907209',
      email: 'casadainovacaoteresopolis@gmail.com'
    },
    'sao-pedro': {
      nome: 'SÃ£o Pedro',
      selo: 'Nova unidade',
      endereco: 'Rua SÃ£o Pedro, nÂº 191, Loja 01',
      cidade: 'SÃ£o Pedro, TeresÃ³polis Â· RJ',
      maps: 'https://www.google.com/maps/search/?api=1&query=Rua+S%C3%A3o+Pedro+191+Loja+01+S%C3%A3o+Pedro+Teres%C3%B3polis+RJ',
      embed: 'https://www.google.com/maps?q=Rua+S%C3%A3o+Pedro,+191,+Teres%C3%B3polis+-+RJ&output=embed',
      telefone: '(21) 2040-1220',
      tel: '+552120401220',
      email: 'casadainovacaosaopedro@gmail.com'
    }
  },

  /* ---------- CURSOS POR UNIDADE ----------
     idades: 'kids' (8â€“11), 'teens' (12â€“17), 'adultos' (18â€“59), '60' (60+)
     icone:  robo | games | apps | ingles | pc | sessenta
     horarios: [dias, horÃ¡rio, turma (opcional)]                         */
  cursos: {
    'beira-linha': [
      {
        id: 'ingles', icone: 'ingles', area: 'Idiomas',
        nome: 'IntroduÃ§Ã£o Ã  LÃ­ngua Inglesa',
        publico: 'Kids Â· 8â€“11 anos', idades: ['kids'],
        resumo: 'Um primeiro contato com a lÃ­ngua inglesa de forma leve, prÃ¡tica e conectada ao dia a dia.',
        aprende: 'VocabulÃ¡rio, conversaÃ§Ã£o, compreensÃ£o e confianÃ§a para se comunicar.',
        horarios: [['Seg. / Qua.', '09hâ€“10h'], ['Ter. / Qui.', '14hâ€“15h']]
      },
      {
        id: 'apps', icone: 'apps', area: 'Tecnologia',
        nome: 'CriaÃ§Ã£o de Aplicativos',
        publico: 'A partir de 15 anos', idades: ['teens', 'adultos'],
        resumo: 'Transforme uma ideia em um projeto digital, criando tanto sites quanto aplicativos.',
        aprende: 'IdeaÃ§Ã£o, prototipaÃ§Ã£o, lÃ³gica de programaÃ§Ã£o, criaÃ§Ã£o de interfaces, sites e aplicativos.',
        horarios: [['Seg. / Qua.', '10hâ€“11h'], ['Ter. / Qui.', '15hâ€“16h']]
      },
      {
        id: 'robotica', icone: 'robo', area: 'Tecnologia',
        nome: 'RobÃ³tica',
        publico: 'Kids Â· 8â€“11 anos Â· Teens Â· 12â€“17 anos', idades: ['kids', 'teens'],
        resumo: 'Aprendizado mÃ£o na massa para explorar tecnologia, criatividade e resoluÃ§Ã£o de problemas.',
        aprende: 'EletrÃ´nica bÃ¡sica, lÃ³gica, programaÃ§Ã£o e construÃ§Ã£o de projetos com movimento.',
        horarios: [['Seg. / Qua.', '14hâ€“15h'], ['Ter. / Qui.', '10hâ€“11h']]
      },
      {
        id: 'games', icone: 'games', area: 'Tecnologia',
        nome: 'Desenvolvimento de Games',
        publico: 'Kids Â· 8â€“11 anos Â· Teens Â· 12â€“17 anos', idades: ['kids', 'teens'],
        resumo: 'Um espaÃ§o para imaginar, criar e programar jogos do zero usando o Clickteam Fusion.',
        aprende: 'Roteiro, lÃ³gica, programaÃ§Ã£o, design de fases e criaÃ§Ã£o de jogos com o Clickteam Fusion.',
        horarios: [['Seg. / Qua.', '15hâ€“16h'], ['Seg. / Qua.', '16hâ€“17h'], ['Ter. / Qui.', '09hâ€“10h']]
      },
      {
        id: 'informatica18', icone: 'pc', area: 'Tecnologia',
        nome: 'IntroduÃ§Ã£o Ã  InformÃ¡tica',
        publico: 'Adultos Â· 18â€“59 anos Â· Teens Â· 12â€“17 anos', idades: ['adultos', 'teens'],
        resumo: 'Aprenda a usar as principais ferramentas digitais para estudar, trabalhar e organizar sua rotina.',
        aprende: 'Word, PowerPoint, Excel, criaÃ§Ã£o e organizaÃ§Ã£o de pastas e arquivos.',
        horarios: [
          ['Seg. / Qua.', '17hâ€“18h', 'Adultos'], ['Ter. / Qui.', '17hâ€“18h', 'Adultos'],
          ['Seg. / Qua.', '11hâ€“12h', 'Teens'], ['Ter. / Qui.', '16hâ€“17h', 'Teens']
        ]
      },
      {
        id: 'informatica60', icone: 'sessenta', area: 'Tecnologia',
        nome: 'InclusÃ£o Digital 60+',
        publico: '60 anos ou mais', idades: ['60'],
        resumo: 'Mais autonomia para explorar o mundo digital.',
        aprende: 'Mais autonomia para explorar o mundo digital.',
        horarios: [['Ter. / Qui.', '11hâ€“12h']]
      }
    ],
    'sao-pedro': [
      {
        id: 'informatica60', icone: 'sessenta', area: 'Tecnologia',
        nome: 'InclusÃ£o Digital 60+',
        publico: 'Melhor idade Â· 60+ anos', idades: ['60'],
        resumo: 'Tecnologia, criatividade e autonomia digital para a melhor idade.',
        aprende: 'Tecnologia, criatividade e autonomia digital para a melhor idade.',
        horarios: [['Seg. / Qua.', '08hâ€“09h'], ['Ter. / Qui.', '08hâ€“09h']]
      },
      {
        id: 'games', icone: 'games', area: 'Tecnologia',
        nome: 'Desenvolvimento de Games',
        publico: 'Kids Â· 8â€“11 anos Â· Teens Â· 12â€“17 anos', idades: ['kids', 'teens'],
        resumo: 'Um espaÃ§o para imaginar, criar e programar jogos do zero.',
        aprende: 'Roteiro, lÃ³gica, programaÃ§Ã£o, design de fases e criaÃ§Ã£o de jogos.',
        horarios: [
          ['Seg. / Qua.', '09â€“10h / 10â€“11h', 'Kids / Teens A'], ['Seg. / Qua.', '13â€“14h / 14â€“15h', 'Kids / Teens C'],
          ['Ter. / Qui.', '09â€“10h / 10â€“11h', 'Kids / Teens B'], ['Ter. / Qui.', '15â€“16h / 16â€“17h', 'Kids / Teens D']
        ]
      },
      {
        id: 'ingles', icone: 'ingles', area: 'Idiomas',
        nome: 'InglÃªs',
        publico: 'A partir de 15 anos', idades: ['teens', 'adultos'],
        resumo: 'PrÃ¡tica de inglÃªs para ampliar possibilidades de estudo, trabalho e comunicaÃ§Ã£o.',
        aprende: 'VocabulÃ¡rio, conversaÃ§Ã£o, compreensÃ£o e confianÃ§a para se comunicar.',
        horarios: [['Ter. / Qui.', '11hâ€“12h', 'InglÃªs Teens A'], ['Ter. / Qui.', '13hâ€“14h', 'InglÃªs Teens B']]
      }
    ]
  }
};

;
/* =========================================================
   CASA DA INOVAÃ‡ÃƒO â€” interaÃ§Ãµes
   ========================================================= */
(() => {
  const D = window.CASA;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;

  /* ---------- Ã­cones ---------- */
  const ICONS = {
    robo: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4.5V8M9.5 12.5v1M14.5 12.5v1M9.5 16h5M3 12v3M21 12v3"/><circle cx="12" cy="3.5" r="1"/>',
    games: '<path d="M7 8h10a4.5 4.5 0 0 1 4.5 4.5V15a2.6 2.6 0 0 1-4.7 1.5L15.5 15h-7l-1.3 1.5A2.6 2.6 0 0 1 2.5 15v-2.5A4.5 4.5 0 0 1 7 8z"/><path d="M8 10.5v3M6.5 12h3M15.5 11.5h.01M17.5 13h.01"/>',
    apps: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18.5h3M10 8.5l-2 2 2 2M14 8.5l2 2-2 2"/>',
    ingles: '<path d="M4 4.5h12a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-5.5L6 19v-3.5H4a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 4 4.5z"/><path d="M7.5 9h7M7.5 12h4.5"/>',
    pc: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M7 8.5h4"/>',
    sessenta: '<rect x="5" y="2.5" width="14" height="19" rx="3"/><path d="M12 15.5s-3.2-1.9-3.2-4.2a1.8 1.8 0 0 1 3.2-1.1 1.8 1.8 0 0 1 3.2 1.1c0 2.3-3.2 4.2-3.2 4.2z"/>',
    mao: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
    pessoas: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17.5" cy="9" r="2.5"/><path d="M16 14.2A5 5 0 0 1 21.5 19"/>',
    foguete: '<path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z"/><path d="M12 15l-3-3a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>',
    pin: '<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    tel: '<path d="M21 16.4v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.6 2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 9.4a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 6l9 7 9-7"/>',
    seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    externo: '<path d="M7 17L17 7M8 7h9v9"/>'
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;
  const fillIcons = (root = document) => $$('[data-icon]', root).forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
  fillIcons();

  const ACCENT = { robo: '#FFC21A', games: '#FF6A1A', apps: '#2F8CFF', ingles: '#3BE07A', pc: '#B98CFF', sessenta: '#FF7EB6' };

  /* ---------- faixa infinita ---------- */
  // duplica a lista atÃ© cobrir a tela duas vezes; a animaÃ§Ã£o anda -50% e recomeÃ§a sem emenda
  const mqTrack = $('.marquee-track');
  const mqSet = mqTrack.innerHTML;
  const fillTrack = () => {
    mqTrack.innerHTML = mqSet;
    const setW = mqTrack.scrollWidth;
    const copies = Math.max(1, Math.ceil((innerWidth + 200) / setW));
    mqTrack.innerHTML = mqSet.repeat(copies * 2);
    mqTrack.style.animationDuration = `${(setW * copies) / 70}s`; // ~70px por segundo em qualquer tela
  };
  fillTrack();
  document.fonts && document.fonts.ready.then(fillTrack);
  let lastW = innerWidth;
  addEventListener('resize', () => { if (Math.abs(innerWidth - lastW) > 80) { lastW = innerWidth; fillTrack(); } });

  /* ---------- preloader ---------- */
  const start = () => requestAnimationFrame(() => document.documentElement.classList.add('is-loaded'));
  setTimeout(start, reduce ? 0 : 1400);

  /* ---------- nav, progresso, link ativo ---------- */
  const nav = $('.nav');
  const bar = $('.progress span');
  let lastY = 0;
  const onScrollNav = () => {
    const y = scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    nav.classList.toggle('is-hidden', y > 600 && y > lastY + 4 && !document.body.classList.contains('menu-open'));
    if (y < lastY - 4) nav.classList.remove('is-hidden');
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };

  const links = $$('.nav-links a');
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['casa', 'cursos', 'historia', 'orquestra', 'local'].forEach((id) => secObs.observe(document.getElementById(id)));

  // menu mobile
  const burger = $('.nav-burger');
  const menu = $('.menu');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    document.body.classList.toggle('is-locked', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.setAttribute('aria-hidden', !open);
  };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- reveal ---------- */
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); revObs.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  const watchReveal = (root = document) => {
    // atraso escalonado entre irmÃ£os
    $$('[data-reveal]', root).forEach((el) => {
      const sibs = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal'));
      el.style.setProperty('--d', `${Math.min(sibs.indexOf(el), 6) * 0.08}s`);
      revObs.observe(el);
    });
  };
  watchReveal();

  /* ---------- contadores ---------- */
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target; const to = +el.dataset.count;
      countObs.unobserve(el);
      if (reduce) { el.textContent = to; return; }
      const t0 = performance.now(), dur = 1600;
      const step = (t) => {
        const p = clamp((t - t0) / dur, 0, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: .6 });
  $$('[data-count]').forEach((el) => countObs.observe(el));

  /* ---------- texto digitado ---------- */
  const typed = $('.typed');
  const words = ['robÃ³tica', 'programaÃ§Ã£o', 'games', 'inglÃªs', 'informÃ¡tica', 'apps'];
  if (!reduce) {
    let wi = 0, ci = words[0].length, del = true;
    const tick = () => {
      if (del) {
        typed.textContent = words[wi].slice(0, --ci);
        if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
        return setTimeout(tick, 45);
      }
      typed.textContent = words[wi].slice(0, ++ci);
      if (ci === words[wi].length) { del = true; return setTimeout(tick, 1900); }
      setTimeout(tick, 85);
    };
    setTimeout(tick, 2600);
  }

  /* ---------- protoboard interativa (hero) ---------- */
  const canvas = $('.hero-canvas');
  const ctx = canvas.getContext('2d');
  const GAP = 28;
  const COLORS = ['255,194,26', '255,106,26', '47,140,255'];
  let W, H, cols, rows, dpr, glow = [];
  const ptr = { x: -999, y: -999, tx: -999, ty: -999 };
  const pulses = [];
  let heroVisible = true, raf;

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(W / GAP) + 1; rows = Math.ceil(H / GAP) + 1;
    glow = new Float32Array(cols * rows);
    if (reduce) drawStatic();
  };
  const nx = (c) => c * GAP + (W % GAP) / 2;
  const ny = (r) => r * GAP + (H % GAP) / 2;

  const spawnPulse = (c0, r0) => {
    if (pulses.length > 9) return;
    let c = c0 ?? Math.floor(Math.random() * cols);
    let r = r0 ?? Math.floor(Math.random() * rows);
    const path = [[c, r]];
    let dir = Math.floor(Math.random() * 4);
    const len = 10 + Math.floor(Math.random() * 16);
    for (let i = 0; i < len; i++) {
      if (Math.random() < .22) dir = (dir + (Math.random() < .5 ? 1 : 3)) % 4;
      c += [1, 0, -1, 0][dir]; r += [0, 1, 0, -1][dir];
      if (c < 0 || r < 0 || c >= cols || r >= rows) break;
      path.push([c, r]);
    }
    if (path.length > 3) pulses.push({ path, head: 0, speed: .18 + Math.random() * .14, color: COLORS[Math.floor(Math.random() * 3)] });
  };

  const drawStatic = () => {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,.09)';
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) { ctx.beginPath(); ctx.arc(nx(c), ny(r), 1.2, 0, 7); ctx.fill(); }
  };

  let lastSpawn = 0;
  const frame = (t) => {
    raf = requestAnimationFrame(frame);
    if (!heroVisible) return;
    ptr.x += (ptr.tx - ptr.x) * .12; ptr.y += (ptr.ty - ptr.y) * .12;
    ctx.clearRect(0, 0, W, H);

    if (t - lastSpawn > 520) { spawnPulse(); lastSpawn = t; }

    // pulsos acendem os furos por onde passam
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.head += p.speed;
      const hi = Math.floor(p.head);
      const TRAIL = 6;
      ctx.lineWidth = 2; ctx.lineCap = 'round';
      for (let k = Math.max(1, hi - TRAIL); k <= Math.min(hi, p.path.length - 1); k++) {
        const a = 1 - (hi - k) / TRAIL;
        const [c1, r1] = p.path[k - 1], [c2, r2] = p.path[k];
        ctx.strokeStyle = `rgba(${p.color},${a * .75})`;
        ctx.beginPath(); ctx.moveTo(nx(c1), ny(r1)); ctx.lineTo(nx(c2), ny(r2)); ctx.stroke();
        glow[r2 * cols + c2] = Math.max(glow[r2 * cols + c2], a * .8);
      }
      if (hi < p.path.length) {
        const [hc, hr] = p.path[hi];
        ctx.fillStyle = `rgba(${p.color},1)`;
        ctx.shadowColor = `rgba(${p.color},1)`; ctx.shadowBlur = 14;
        ctx.beginPath(); ctx.arc(nx(hc), ny(hr), 2.6, 0, 7); ctx.fill();
        ctx.shadowBlur = 0;
      }
      if (hi > p.path.length + TRAIL) pulses.splice(i, 1);
    }

    // furos da protoboard
    const R = 170;
    for (let c = 0; c < cols; c++) {
      const x = nx(c);
      for (let r = 0; r < rows; r++) {
        const y = ny(r);
        const idx = r * cols + c;
        const dx = x - ptr.x, dy = y - ptr.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const m = d < R ? 1 - d / R : 0;
        const g = glow[idx] = Math.max(glow[idx] * .94, m * m);
        if (g > .02) {
          ctx.fillStyle = `rgba(255,${Math.round(194 - 88 * (1 - g))},26,${.15 + g * .85})`;
          ctx.beginPath(); ctx.arc(x, y, 1.3 + g * 2.2, 0, 7); ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(255,255,255,.085)';
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }
    }
  };

  resize();
  addEventListener('resize', resize);
  if (!reduce) {
    const hero = $('.hero');
    let lastPtrSpawn = 0;
    hero.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      ptr.tx = e.clientX - r.left; ptr.ty = e.clientY - r.top;
      if (ptr.x < -500) { ptr.x = ptr.tx; ptr.y = ptr.ty; }
      const now = performance.now();
      if (now - lastPtrSpawn > 260) {
        spawnPulse(Math.round((ptr.tx - (W % GAP) / 2) / GAP), Math.round((ptr.ty - (H % GAP) / 2) / GAP));
        lastPtrSpawn = now;
      }
    });
    hero.addEventListener('pointerleave', () => { ptr.tx = ptr.ty = -999; });
    new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);
    raf = requestAnimationFrame(frame);
  }

  /* ---------- foto do hero: parallax no scroll e leve deslocamento com o mouse ---------- */
  const media = $('.hero-media');
  if (!reduce) {
    const m = { x: 0, y: 0 };
    const paintMedia = () => {
      const sy = Math.min(scrollY, innerHeight) * .3;
      media.style.transform = `translate3d(${m.x * -16}px, ${m.y * -10 + sy}px, 0)`;
    };
    if (fine) {
      $('.hero').addEventListener('pointermove', (e) => {
        m.x = e.clientX / innerWidth - .5; m.y = e.clientY / innerHeight - .5;
        requestAnimationFrame(paintMedia);
      });
    }
    addEventListener('scroll', () => { if (scrollY < innerHeight * 1.2) requestAnimationFrame(paintMedia); }, { passive: true });
  }

  /* ---------- botÃµes magnÃ©ticos ---------- */
  if (fine && !reduce) {
    $$('.magnetic').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .28}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  /* ---------- inscriÃ§Ãµes ---------- */
  const abertas = !!D.inscricoes.abertas;
  const formLink = (u) => (abertas && D.inscricoes.links[u]) || '';
  const insta = D.contato.instagram;

  const renderInscricao = () => {
    const st = $('.status');
    st.classList.toggle('is-open', abertas);
    $('.status-txt').textContent = abertas ? 'InscriÃ§Ãµes abertas' : 'InscriÃ§Ãµes encerradas';
    $('.inscricao-msg').textContent = abertas
      ? 'As inscriÃ§Ãµes estÃ£o abertas! Escolha a unidade e preencha o formulÃ¡rio. Ã‰ rÃ¡pido e 100% gratuito.'
      : 'As inscriÃ§Ãµes estÃ£o fechadas no momento. Acompanhe os canais da Casa para saber quando novas vagas estiverem disponÃ­veis.';
    const passos = abertas
      ? ['Veja os cursos e horÃ¡rios de cada unidade.', 'Escolha a unidade mais perto de vocÃª.', 'Preencha o formulÃ¡rio de inscriÃ§Ã£o.']
      : ['Veja os cursos e horÃ¡rios de cada unidade.', 'Escolha a unidade para consultar as informaÃ§Ãµes.', 'Acompanhe os canais da Casa para novas vagas.'];
    $('.passos').innerHTML = passos.map((p) => `<li>${p}</li>`).join('');

    const btns = $('.inscricao-btns');
    if (abertas) {
      btns.innerHTML = Object.entries(D.unidades).map(([k, u]) => {
        const l = formLink(k);
        return l
          ? `<a class="btn btn-ink magnetic" href="${l}" target="_blank" rel="noopener">InscriÃ§Ã£o Â· ${u.nome} <span class="arrow">â†—</span></a>`
          : `<span class="btn btn-ink" aria-disabled="true">${u.nome} Â· em breve</span>`;
      }).join('');
    } else {
      btns.innerHTML = `
        <a class="btn btn-ink magnetic" href="${insta}" target="_blank" rel="noopener">Seguir no Instagram <span class="arrow">â†—</span></a>
        <a class="btn btn-line" href="/pre-matricula">Selecionar unidade <span class="arrow">â†—</span></a>
        <small>O formulÃ¡rio serÃ¡ reaberto quando houver novas vagas.</small>`;
    }
  };
  renderInscricao();

  /* ---------- unidades ---------- */
  $('.unidades').innerHTML = Object.entries(D.unidades).map(([k, u]) => `
    <article class="unidade" data-reveal>
      <div class="unidade-map">
        <iframe data-src="${u.embed}" title="Mapa da unidade ${u.nome}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <span class="unidade-selo">${u.selo}</span>
      </div>
      <div class="unidade-body">
        <h3>${u.nome}</h3>
        <address>${u.endereco}<br>${u.cidade}</address>
        <div class="unidade-links">
          <a href="tel:${u.tel}"><i>${icon('tel')}</i>${u.telefone}</a>
          <a href="mailto:${u.email}"><i>${icon('mail')}</i>${u.email}</a>
        </div>
        <a class="btn btn-ink btn-sm" href="${u.maps}" target="_blank" rel="noopener">Como chegar <span class="arrow">â†’</span></a>
      </div>
    </article>`).join('');
  watchReveal($('.unidades'));
  // carrega os mapas sÃ³ quando chegam perto da tela
  const mapObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.src = e.target.dataset.src; mapObs.unobserve(e.target);
    });
  }, { rootMargin: '400px' });
  $$('.unidade-map iframe').forEach((f) => mapObs.observe(f));

  /* ---------- cursos ---------- */
  const state = { unidade: 'beira-linha', idade: 'todas' };
  const cardsEl = $('.cards');
  const segBtns = $$('.seg button');
  const pill = $('.seg-pill');

  const movePill = () => {
    const b = segBtns.find((x) => x.dataset.unidade === state.unidade);
    pill.style.width = b.offsetWidth + 'px';
    pill.style.transform = `translateX(${b.offsetLeft - 5}px)`;
  };

  const cardHTML = (c, i) => {
    const max = 2;
    const hs = c.horarios.slice(0, max).map((h) => `<span>${h[0]} ${h[1].split(' / ')[0]}</span>`).join('');
    const mais = c.horarios.length > max ? `<span class="mais">+${c.horarios.length - max} turmas</span>` : '';
    return `
      <a class="card" href="#curso-${c.id}" style="--accent:${ACCENT[c.icone]}" data-id="${c.id}" aria-haspopup="dialog">
        <div class="card-top"><span class="card-area">${c.area}</span><span class="card-icon">${icon(c.icone)}</span></div>
        <h3>${c.nome}</h3>
        <p class="card-publico">${c.publico}</p>
        <p class="card-resumo">${c.resumo}</p>
        <div class="card-horarios">${hs}${mais}</div>
        <span class="card-cta">Ver turmas e horÃ¡rios <span class="arrow">${icon('seta')}</span></span>
      </a>`;
  };

  const renderCursos = (animate = true) => {
    const u = D.unidades[state.unidade];
    $('.cursos-endereco span').textContent = `${u.endereco} Â· ${u.cidade}`;
    const list = D.cursos[state.unidade].filter((c) => state.idade === 'todas' || c.idades.includes(state.idade));
    const paint = () => {
      if (!list.length) {
        const outra = state.unidade === 'beira-linha' ? 'sao-pedro' : 'beira-linha';
        cardsEl.innerHTML = `<div class="cards-vazio"><p>Ainda nÃ£o hÃ¡ turma para essa idade na unidade ${u.nome}.</p>
          <button class="btn btn-ghost btn-sm" data-trocar="${outra}">Ver unidade ${D.unidades[outra].nome} <span class="arrow">â†’</span></button></div>`;
        return;
      }
      cardsEl.innerHTML = list.map(cardHTML).join('');
      const cards = $$('.card', cardsEl);
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('is-in'), reduce ? 0 : 60 + i * 70);
        bindCard(card);
      });
    };
    const old = $$('.card', cardsEl);
    if (animate && old.length && !reduce) {
      old.forEach((c) => c.classList.add('is-out'));
      setTimeout(paint, 200);
    } else paint();
  };

  const bindCard = (card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty('--mx', x + 'px'); card.style.setProperty('--my', y + 'px');
      if (fine && !reduce) card.style.transform = `perspective(900px) rotateX(${(.5 - y / r.height) * 5}deg) rotateY(${(x / r.width - .5) * 6}deg)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    card.addEventListener('click', (e) => { e.preventDefault(); openModal(card.dataset.id); });
  };

  segBtns.forEach((b) => b.addEventListener('click', () => {
    if (state.unidade === b.dataset.unidade) return;
    state.unidade = b.dataset.unidade;
    segBtns.forEach((x) => x.setAttribute('aria-selected', x === b));
    movePill(); renderCursos();
  }));
  $$('.chips button').forEach((b) => b.addEventListener('click', () => {
    state.idade = b.dataset.idade;
    $$('.chips button').forEach((x) => x.setAttribute('aria-pressed', x === b));
    renderCursos();
  }));
  cardsEl.addEventListener('click', (e) => {
    const t = e.target.closest('[data-trocar]');
    if (t) segBtns.find((x) => x.dataset.unidade === t.dataset.trocar).click();
  });

  // pinta os cards quando a seÃ§Ã£o aparece
  new IntersectionObserver(([e], o) => {
    if (e.isIntersecting) { renderCursos(false); o.disconnect(); }
  }, { rootMargin: '0px 0px -15% 0px' }).observe(cardsEl);
  movePill();
  addEventListener('resize', movePill);
  document.fonts && document.fonts.ready.then(movePill);

  /* ---------- modal ---------- */
  const modal = $('.modal');
  const modalInner = $('.modal-inner');
  let lastFocus = null;

  const openModal = (id, unidade = state.unidade) => {
    const c = D.cursos[unidade].find((x) => x.id === id);
    if (!c) return;
    const u = D.unidades[unidade];
    const link = formLink(unidade);
    const cta = link
      ? `<a class="btn btn-yellow" href="${link}" target="_blank" rel="noopener">Fazer inscriÃ§Ã£o <span class="arrow">â†—</span></a>`
      : `<span class="btn btn-yellow" aria-disabled="true">InscriÃ§Ãµes encerradas</span>
         <a class="btn btn-ghost" href="${insta}" target="_blank" rel="noopener">Acompanhar no Instagram <span class="arrow">â†—</span></a>
         <small>${abertas ? 'O formulÃ¡rio desta unidade serÃ¡ publicado em breve.' : 'O formulÃ¡rio serÃ¡ reaberto quando houver novas vagas.'}</small>`;
    modalInner.style.setProperty('--accent', ACCENT[c.icone]);
    modalInner.innerHTML = `
      <div class="modal-hero">
        <button class="modal-close" aria-label="Fechar">${icon('x')}</button>
        <p class="modal-kicker">Curso gratuito Â· ${c.area}</p>
        <h2 id="modal-title">${c.nome}</h2>
        <p class="modal-resumo">${c.resumo}</p>
      </div>
      <div class="modal-body">
        <div class="modal-bloco">
          <h4>O que vocÃª vai aprender</h4>
          <p class="modal-aprende">${c.aprende}</p>
          <p class="modal-nota">As atividades sÃ£o pensadas para o ritmo da turma, com prÃ¡tica, troca e acompanhamento da equipe.</p>
        </div>
        <div class="modal-meta">
          <div><span>Faixa etÃ¡ria</span><b>${c.publico}</b></div>
          <div><span>Unidade</span><b>${u.nome} Â· ${u.endereco}</b></div>
        </div>
        <div class="modal-bloco">
          <h4>Turmas e horÃ¡rios</h4>
          <ul class="horarios">${c.horarios.map((h) => `
            <li><span class="dias">${h[0].replace('Seg. / Qua.', 'Segunda e quarta').replace('Ter. / Qui.', 'TerÃ§a e quinta')}${h[2] ? `<span class="turma">${h[2]}</span>` : ''}</span><span class="hora">${h[1]}</span></li>`).join('')}
          </ul>
        </div>
        <div class="modal-ctas">${cta}</div>
      </div>`;
    lastFocus = document.activeElement;
    modal.showModal();
    document.body.classList.add('is-locked');
    $('.modal-close', modal).addEventListener('click', closeModal);
    history.replaceState(null, '', `#curso-${id}${unidade === 'sao-pedro' ? '-sp' : ''}`);
  };
  const closeModal = () => {
    if (!modal.open) return;
    modal.close();
  };
  modal.addEventListener('close', () => {
    document.body.classList.remove('is-locked');
    history.replaceState(null, '', location.pathname + location.search);
    lastFocus && lastFocus.focus({ preventScroll: true });
  });
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // links antigos (/cursos/robotica â†’ /#curso-robotica) abrem o curso direto
  const fromHash = () => {
    const m = location.hash.match(/^#curso-([a-z0-9]+?)(-sp)?$/);
    if (!m) return;
    const unidade = m[2] ? 'sao-pedro' : 'beira-linha';
    if (unidade !== state.unidade) segBtns.find((x) => x.dataset.unidade === unidade).click();
    document.getElementById('cursos').scrollIntoView();
    setTimeout(() => openModal(m[1], unidade), reduce ? 0 : 250);
  };
  fromHash();

  /* ---------- efeitos ligados ao scroll ---------- */
  const historia = $('.historia');
  const track = $('.historia-track');
  const viewport = $('.historia-viewport');
  const line = $('.historia-line span');
  const marcos = $$('.marco');
  const acontece = $('.acontece-media');
  const orqMedia = $('.orquestra-media');
  const orq = $('.orquestra');
  const wide = matchMedia('(min-width: 861px)');
  let dist = 0;

  const layoutHistoria = () => {
    dist = Math.max(0, track.scrollWidth - innerWidth);
    const pin = $('.historia-pin');
    historia.classList.toggle('historia-static', reduce);
    if (!wide.matches || reduce) {
      historia.style.height = '';
      pin.style.position = '';
      pin.style.top = '';
      pin.style.minHeight = '';
      pin.style.display = '';
      pin.style.flexDirection = '';
      pin.style.justifyContent = '';
      track.style.transform = '';
      return;
    }
    historia.classList.remove('historia-static');
    pin.style.position = 'sticky'; pin.style.top = '0';
    pin.style.minHeight = '100vh';
    pin.style.display = 'flex'; pin.style.flexDirection = 'column'; pin.style.justifyContent = 'center';
    historia.style.height = (pin.offsetHeight + dist) + 'px';
  };

  const onScrollFx = () => {
    const vh = innerHeight;

    // histÃ³ria: rola na horizontal no desktop, preenche a linha no celular
    const r = historia.getBoundingClientRect();
    let p;
    if (wide.matches && !reduce) {
      const total = historia.offsetHeight - $('.historia-pin').offsetHeight;
      p = total > 0 ? clamp(-r.top / total, 0, 1) : 0;
      track.style.transform = `translate3d(${-p * dist}px,0,0)`;
      line.style.transform = `scaleX(${p})`;
      marcos.forEach((m, i) => m.classList.toggle('is-on', r.top < vh * .5 && p >= i / (marcos.length - 1) - .04));
    } else {
      const vr = viewport.getBoundingClientRect();
      p = clamp((vh * .6 - vr.top) / vr.height, 0, 1);
      line.parentElement.style.setProperty('--p', p);
      marcos.forEach((m) => m.classList.toggle('is-on', m.getBoundingClientRect().top < vh * .6));
    }

    // galeria abre ao entrar
    const ar = acontece.getBoundingClientRect();
    const c = clamp((ar.top - vh * .15) / (vh * .7), 0, 1);
    acontece.style.setProperty('--c', reduce ? 0 : c.toFixed(3));

    // parallax da orquestra
    const or = orq.getBoundingClientRect();
    if (!reduce && or.bottom > 0 && or.top < vh) {
      const op = (vh - or.top) / (vh + or.height);
      orqMedia.style.transform = `translate3d(0,${(op - .5) * 14}%,0)`;
    }
  };

  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScrollNav(); onScrollFx(); ticking = false; });
  }, { passive: true });
  const relayout = () => { layoutHistoria(); onScrollFx(); };
  addEventListener('resize', relayout);
  addEventListener('load', relayout);
  document.fonts && document.fonts.ready.then(relayout);
  relayout(); onScrollNav();

  const whats = $('.whats');
  if (whats) {
    let whatsTicking = false;
    const updateWhatsVisibility = () => {
      whatsTicking = false;
      const rect = whats.getBoundingClientRect();
      const overlapsControl = Array.from(document.querySelectorAll('a, button, input, select, textarea, [tabindex="0"], .card'))
        .some((control) => {
          if (control === whats || whats.contains(control)) return false;
          const target = control.getBoundingClientRect();
          return target.width > 0 && target.height > 0 && rect.left < target.right && rect.right > target.left && rect.top < target.bottom && rect.bottom > target.top;
        });
      whats.classList.toggle('is-obscured', overlapsControl);
      whats.setAttribute('aria-hidden', String(overlapsControl));
      whats.tabIndex = overlapsControl ? -1 : 0;
    };
    const scheduleWhatsVisibility = () => {
      if (whatsTicking) return;
      whatsTicking = true;
      requestAnimationFrame(updateWhatsVisibility);
    };
    addEventListener('scroll', scheduleWhatsVisibility, { passive: true });
    addEventListener('resize', scheduleWhatsVisibility);
    requestAnimationFrame(scheduleWhatsVisibility);
  }
})();
