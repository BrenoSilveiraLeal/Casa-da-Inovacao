import Link from "next/link";

const registrations = [
  {
    label: "Unidade sede",
    name: "Beira Linha",
    address: "Rua Beira Linha, 329 · Teresópolis",
    courses: "Inglês, Criação de Aplicativos, Inclusão Digital 60+, Robótica, Desenvolvimento de Games e Introdução à Informática.",
    form: "https://docs.google.com/forms/d/e/1FAIpQLSdUgwMVjn7P-t4hZxPQ8pxbdKvaJLssmjazlcooW8n8mWnLXQ/viewform",
  },
  {
    label: "Nova unidade",
    name: "São Pedro",
    address: "Rua São Pedro, nº 191, Loja 01 · Teresópolis",
    courses: "Inglês, Inclusão Digital 60+ e Desenvolvimento de Games.",
    form: "https://docs.google.com/forms/d/e/1FAIpQLSc60R92wI_qZRH450rKPQU1iAWsz9fFKZ1JViZZyeR1JQtSKw/viewform",
  },
];

export default function RegistrationChoice() {
  return <main className="proposal-site registration-page">
    <header className="header scrolled choice-header" id="top">
      <div className="wrap">
        <Link href="/" className="logo" aria-label="Casa da Inovação">
          <img className="site-logo" src="/imagens/otimizadas/logo.webp" alt="" />
          <span className="logo-wordmark">Casa da<br/>Inovação</span>
        </Link>
        <nav className="nav" aria-label="Navegação principal">
          <Link href="/#casa">A Casa</Link><Link href="/#cursos">Cursos</Link><Link href="/#historia">História</Link><Link href="/#local">Unidades</Link>
        </nav>
        <Link href="/" className="choice-back">Voltar ao site <span aria-hidden="true">↗</span></Link>
      </div>
    </header>

    <section className="choice-options" id="unidades-form">
      <div className="wrap">
        <div className="choice-heading">
          <span className="eyebrow">Encontre sua turma</span>
          <h2>Onde você quer <em>estudar?</em></h2>
          <p className="lead">Cada unidade tem seus próprios cursos e horários.</p>
        </div>
        <div className="choice-grid">
          {registrations.map((unit, index) => <article className="choice-unit" key={unit.name}>
            <div className="choice-unit-top"><span className="badge">{unit.label}</span><span className="choice-index">0{index + 1}</span></div>
            <h3>{unit.name}</h3>
            <p className="choice-address">{unit.address}</p>
            <div className="choice-course-list"><span>Cursos disponíveis</span><p>{unit.courses}</p></div>
            <a className="btn btn-primary" href={unit.form} target="_blank" rel="noopener noreferrer">Abrir formulário <span aria-hidden="true">↗</span></a>
          </article>)}
        </div>
      </div>
    </section>

    <footer className="choice-footer">
      <div className="wrap">
        <div className="cols">
          <div className="footer-brand"><Link href="/" className="logo" aria-label="Casa da Inovação"><img className="site-logo" src="/imagens/otimizadas/logo.webp" alt="Casa da Inovação E. F. Therezópolis" /></Link><p>Educação, tecnologia e oportunidades gratuitas para quem mora em Teresópolis.</p></div>
          <div><h4>Navegação</h4><ul><li><Link href="/#casa">A Casa</Link></li><li><Link href="/#cursos">Cursos e horários</Link></li><li><Link href="/#local">Unidades</Link></li></ul></div>
          <div><h4>Atendimento</h4><ul><li><a href="tel:+5521966907209">Beira Linha · (21) 96690-7209</a></li><li><a href="mailto:casadainovacaoteresopolis@gmail.com">casadainovacaoteresopolis@gmail.com</a></li><li><a href="tel:+552120401220">São Pedro · (21) 2040-1220</a></li><li><a href="mailto:casadainovacaosaopedro@gmail.com">casadainovacaosaopedro@gmail.com</a></li></ul></div>
          <div><h4>Redes</h4><ul><li><a href="https://www.instagram.com/casadainovacaoteresopolis/" target="_blank" rel="noopener noreferrer">Instagram · @casadainovacaoteresopolis</a></li><li><a href="https://www.facebook.com/casadainovacaoteresopolis/" target="_blank" rel="noopener noreferrer">Facebook · Casa da Inovação</a></li></ul></div>
        </div>
        <div className="bottom"><span>© Casa da Inovação E. F. Therezópolis</span><span>Cursos gratuitos para todas as idades.</span><span className="site-credit">Site desenvolvido por Breno Silveira &middot; <a href="https://www.instagram.com/bsl_silveira/" target="_blank" rel="noopener noreferrer">@bsl_silveira</a></span></div>
      </div>
    </footer>
  </main>;
}
