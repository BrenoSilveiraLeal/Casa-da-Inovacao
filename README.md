# Casa da Inovação E. F. Therezópolis

Site institucional da Casa da Inovação E. F. Therezópolis, em Teresópolis (RJ). Apresenta os cursos gratuitos, horários e faixas etárias por unidade, a história, os mapas de localização e o projeto Orquestra Sustentável. A página de pré-inscrição direciona cada pessoa ao formulário da unidade escolhida.

**Site:** https://casadainovacao.vercel.app

**Pré-inscrição:** https://casadainovacao.vercel.app/pre-matricula

## Unidades

- **Beira Linha:** Rua Beira Linha, 329, Teresópolis · (21) 96690-7209 · casadainovacaoteresopolis@gmail.com
- **São Pedro:** Rua São Pedro, nº 191, Loja 01, Teresópolis · (21) 2040-1220 · casadainovacaosaopedro@gmail.com

## Recursos

- Cursos de tecnologia, idiomas, música e inclusão digital, organizados por unidade e faixa etária.
- Página de pré-inscrição com acesso ao formulário de cada unidade.
- Opção de fachada de dia ou de noite na seção principal.
- Animações de rolagem (GSAP e Lenis), com respeito à preferência de movimento reduzido.
- Layout responsivo para celular, tablet e desktop, com escala automática em telas grandes.
- URLs antigas de cursos (`/cursos/:slug`) redirecionam para a âncora correspondente na página principal.

## Tecnologias

- React 19 e TypeScript
- Vinext (App Router) e Vite
- GSAP e Lenis
- Tailwind CSS 4
- Cloudflare Workers (Wrangler) e publicação no Vercel

## Executar localmente

Requer Node.js 24.

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Comandos

```bash
npm run dev     # servidor de desenvolvimento
npm run build   # build de produção
npm start       # servidor de produção
npm run lint    # ESLint
npm test        # build + testes do HTML renderizado
```

## Estrutura

- `app/page.tsx`: página principal e seções institucionais.
- `app/layout.tsx`: layout global, fontes, folhas de estilo e escala em telas desktop.
- `app/pre-matricula/page.tsx`: seleção da unidade e acesso aos formulários.
- `app/api/pre-matricula/route.ts`: endpoint de pré-inscrição (atualmente responde 410 com inscrições encerradas).
- `app/cursos/`: rotas dos cursos.
- `app/data.ts`: cursos, descrições e horários.
- `app/motion.tsx`: animações de rolagem.
- `public/css/`: estilos do site (`style.css`) e da opção dia/noite (`dia-noite.css`).
- `public/js/`: scripts do site; `dados.js` concentra os dados editáveis, incluindo o estado das inscrições.
- `public/imagens/`: imagens e identidade visual.
- `worker/index.ts`: entrada do Cloudflare Worker.
- `tests/`: testes do HTML renderizado.
- `vercel.json`: redirecionamentos, rewrites e cache de imagens.

## Inscrições

O estado das inscrições é controlado em `public/js/dados.js`:

- `abertas: true`: os botões levam ao formulário de cada unidade (links em `links`).
- `abertas: false`: o site exibe "Inscrições encerradas".
