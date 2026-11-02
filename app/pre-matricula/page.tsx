import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Escolha sua unidade | Casa da Inovação",
  description: "Conheça os cursos gratuitos das unidades Beira Linha e São Pedro.",
};

const units = [
  {
    name: "Beira Linha",
    label: "Unidade sede",
    address: "Rua Beira Linha, 329 · Teresópolis, RJ",
    courses: [
      "Inglês",
      "Criação de Aplicativos",
      "Inclusão Digital 60+",
      "Robótica",
      "Desenvolvimento de Games",
      "Introdução à Informática",
    ],
  },
  {
    name: "São Pedro",
    label: "Nova unidade",
    address: "Rua São Pedro, nº 191, Loja 01 · Teresópolis, RJ",
    courses: ["Inglês", "Inclusão Digital 60+", "Desenvolvimento de Games"],
  },
];

export default function RegistrationChoice() {
  return (
    <main className="unit-selection-page">
      <header className="nav is-scrolled selection-nav">
        <a className="nav-brand" href="/" aria-label="Casa da Inovação — início">
          <img src="/imagens/logo.webp" alt="" width="40" height="40" />
          <span>Casa da<br /><b>Inovação</b></span>
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="/#casa">A Casa</a>
          <a href="/#cursos">Cursos</a>
          <a href="/#historia">História</a>
          <a href="/#local">Unidades</a>
        </nav>
        <a className="btn btn-yellow btn-sm selection-back" href="/">Voltar ao site <span aria-hidden="true">↗</span></a>
      </header>

      <section className="unit-select-section">
        <div className="wrap">
          <div className="unit-select-heading">
            <p className="eyebrow">Pré-inscrição gratuita</p>
            <h1 className="h2">Escolha sua <em>unidade.</em></h1>
            <p className="lead">Veja os cursos disponíveis em cada Casa da Inovação. As inscrições estão encerradas no momento.</p>
          </div>

          <div className="unit-select-grid">
            {units.map((unit, index) => (
              <article className="unit-select-card" key={unit.name}>
                <div className="unit-select-meta">
                  <span className="unit-select-label">{unit.label}</span>
                  <span className="unit-select-number">0{index + 1}</span>
                </div>
                <h2>{unit.name}</h2>
                <p className="unit-select-address">{unit.address}</p>
                <div className="unit-select-courses">
                  <h3>Cursos nesta unidade</h3>
                  <ul>
                    {unit.courses.map((course) => <li key={course}>{course}</li>)}
                  </ul>
                </div>
                <p className="unit-select-closed"><span aria-hidden="true" /> Inscrições encerradas no momento</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="unit-select-footer">
        <div className="wrap">
          <span>Casa da Inovação · Teresópolis, RJ</span>
          <a href="https://www.instagram.com/casadainovacaoteresopolis/" target="_blank" rel="noopener noreferrer">Acompanhe as próximas vagas no Instagram ↗</a>
        </div>
      </footer>
    </main>
  );
}
