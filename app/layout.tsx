import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casa da Inovação E. F. Therezópolis",
  description: "Tecnologia, cultura e oportunidades gratuitas em Teresópolis.",
  openGraph: {
    title: "Casa da Inovação E. F. Therezópolis",
    description: "Cursos gratuitos de tecnologia, cultura e inclusão digital em Teresópolis.",
    images: ["/imagens/fachada.webp"],
  },
  icons: {
    icon: "/imagens/favicon.png",
    shortcut: "/imagens/favicon.png",
  },
};

/*
 * Escala do computador: em telas de computador (>= 1024px e com mouse) o site é
 * montado sempre na largura de referência (1920px, a tela onde o layout foi
 * aprovado) e depois ampliado/reduzido por igual para caber na tela. Assim todo
 * computador vê exatamente a mesma composição. Celular e tablet não são afetados:
 * sem escala, as variáveis --vw/--vh não existem e o CSS usa vw/svh normais.
 * As media queries são reavaliadas como se a tela tivesse a largura de referência.
 */
const DESKTOP_SCALE = `(function () {
  var REF = 1920, MIN = 1024, root = document.documentElement, original = new WeakMap();
  var desktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  function eachMediaRule(rules, fn) {
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r.media && r.cssRules) fn(r);
      if (r.cssRules) eachMediaRule(r.cssRules, fn);
    }
  }
  function apply() {
    var w = window.innerWidth, h = window.innerHeight;
    var on = w >= MIN && desktopPointer.matches;
    var bar = Math.round(w - root.getBoundingClientRect().width);
    if (!(bar > 0 && bar < 40)) bar = 0;
    var z = on ? (w - bar) / (REF - bar) : 1;
    if (on) {
      root.style.zoom = String(z);
      root.style.setProperty('--vw', (w / z / 100) + 'px');
      root.style.setProperty('--vh', (h / z / 100) + 'px');
    } else {
      root.style.zoom = '';
      root.style.removeProperty('--vw');
      root.style.removeProperty('--vh');
    }
    for (var s = 0; s < document.styleSheets.length; s++) {
      var rules;
      try { rules = document.styleSheets[s].cssRules; } catch (e) { continue; }
      eachMediaRule(rules, function (rule) {
        if (!original.has(rule)) original.set(rule, rule.media.mediaText);
        var text = original.get(rule);
        var next = on ? text.replace(/((?:min|max)-(?:width|height)\\s*:\\s*)([\\d.]+)px/g, function (m, p, n) { return p + (parseFloat(n) * z) + 'px'; }) : text;
        if (rule.media.mediaText !== next) rule.media.mediaText = next;
      });
    }
  }
  apply();
  window.addEventListener('resize', apply);
  document.addEventListener('DOMContentLoaded', apply);
  window.addEventListener('load', apply);
  if (desktopPointer.addEventListener) desktopPointer.addEventListener('change', apply);
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Geist:wght@400..700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/style.css?v=20261108-desktop-scale" />
        <link rel="stylesheet" href="/css/dia-noite.css?v=20261108-desktop-scale" />
        <script dangerouslySetInnerHTML={{ __html: DESKTOP_SCALE }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
