/* =========================================================
   CASA DA INOVAÇÃO — opção de dia e noite na fachada
   ========================================================= */
(() => {
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const media = document.querySelector('.hero-media');
  if (!hero || !media) return;


  /* ---------- seletor ---------- */
  const icon = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const picker = document.createElement('div');
  picker.className = 'day-night';
  picker.setAttribute('role', 'group');
  picker.setAttribute('aria-label', 'Ver a fachada de dia ou à noite');
  picker.innerHTML = `
    <button type="button" data-period="dia">${icon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>')}Dia</button>
    <button type="button" data-period="noite">${icon('<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>')}Noite</button>`;
  hero.append(picker);
  const buttons = [...picker.querySelectorAll('button')];

  const paint = (night) => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.period === 'noite') === night)));
  };

  /* ---------- camadas: só baixa quando alguém vai usar ---------- */
  let ready = null;
  const load = () => {
    if (ready) return ready;
    const layer = document.createElement('div');
    layer.className = 'hero-night';
    layer.setAttribute('aria-hidden', 'true');
    const imgs = [
      ['fachada-noite.webp', ''],
      ['fachada-noite-placa.webp', 'night-light night-sign'],
      ['fachada-noite-sala.webp', 'night-light night-room'],
    ].map(([file, cls]) => {
      const img = new Image();
      img.alt = '';
      img.className = cls;
      img.src = `/imagens/${file}`;
      layer.append(img);
      return img;
    });
    media.append(layer);
    const shade = document.createElement('div');
    shade.className = 'hero-shade hero-shade-night';
    shade.setAttribute('aria-hidden', 'true');
    media.after(shade);
    ready = Promise.all(imgs.map((img) => img.decode()));
    ready.catch(() => { layer.remove(); shade.remove(); ready = null; });
    return ready;
  };

  /* ---------- troca ---------- */
  let turn = 0;
  const setNight = (night) => {
    const mine = ++turn;
    paint(night);
    if (!night) { root.classList.remove('is-night'); return; }
    load().then(() => {
      if (mine !== turn) return;
      // espera um quadro com as camadas apagadas para a transição acontecer
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (mine === turn) root.classList.add('is-night');
      }));
    }).catch(() => {
      // sem as fotos da noite, a fachada continua de dia
      if (mine === turn) paint(false);
    });
  };

  buttons.forEach((b) => b.addEventListener('click', () => {
    setNight(b.dataset.period === 'noite');
  }));
  ['pointerenter', 'focusin'].forEach((type) => picker.addEventListener(type, () => { load().catch(() => {}); }, { once: true }));

  // Cada carregamento da página começa de dia; a escolha vale só nesta visita.
  setNight(false);
})();
