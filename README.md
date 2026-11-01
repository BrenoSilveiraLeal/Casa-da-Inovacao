# Casa da Inovação E. F. Therezópolis

Site institucional da Casa da Inovação E. F. Therezópolis, em Teresópolis (RJ). Apresenta os cursos gratuitos, horários, história, unidades, mapas de localização e o projeto Orquestra Sustentável. A página de pré-inscrição direciona cada pessoa ao formulário da unidade escolhida.

**Site:** https://casadainovacao.vercel.app

**Pré-inscrição:** https://casadainovacao.vercel.app/pre-matricula

## Unidades

- **Beira Linha:** Rua Beira Linha, 329, Teresópolis · (21) 96690-7209 · casadainovacaoteresopolis@gmail.com
- **São Pedro:** Rua São Pedro, nº 191, Loja 01, Teresópolis · (21) 2040-1220 · casadainovacaosaopedro@gmail.com

## Tecnologias

- React 19 e TypeScript
- Vinext e Vite
- CSS responsivo
- Publicação no Vercel

## Executar localmente

Requer Node.js 24.

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Comandos

```bash
npm run lint
npm run build
npm test
```

## Estrutura

- `app/page.tsx`: página principal e seções institucionais.
- `app/pre-matricula/page.tsx`: seleção da unidade e acesso aos formulários.
- `app/cursos/`: páginas com detalhes dos cursos.
- `app/data.ts`: cursos, descrições e horários.
- `app/proposal-home.css`: estilos e comportamento responsivo.
- `public/imagens/`: imagens e identidade visual.