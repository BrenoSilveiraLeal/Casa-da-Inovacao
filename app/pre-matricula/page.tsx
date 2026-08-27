import Link from "next/link";

const beiraLinhaForm = "https://docs.google.com/forms/d/e/1FAIpQLSdUgwMVjn7P-t4hZxPQ8pxbdKvaJLssmjazlcooW8n8mWnLXQ/viewform";
const saoPedroForm = "https://docs.google.com/forms/d/e/1FAIpQLSc60R92wI_qZRH450rKPQU1iAWsz9fFKZ1JViZZyeR1JQtSKw/viewform?usp=publish-editor";

export default function RegistrationChoice() {
  return <main className="registration choice-registration">
    <header className="form-header"><Link href="/" className="brand"><span className="brand-mark">CI</span><span>CASA DA<br/><b>INOVAÇÃO</b></span></Link><Link href="/">← Voltar ao site</Link></header>
    <div className="choice-shell"><p className="eyebrow">PRÉ-INSCRIÇÃO · ESCOLHA UMA UNIDADE</p><h1>Onde você<br/><em>quer estudar?</em></h1><p className="form-intro">Selecione a unidade para abrir o formulário correto. Os cursos e horários podem ser diferentes em cada endereço.</p><div className="choice-grid">
      <article className="choice-card"><span>01 · Unidade atual</span><strong>Casa da Inovação<br/>E. F. Therezópolis</strong><p>Beira-Linha · ciclo 7</p><small>Confira os cursos disponíveis no formulário da unidade.</small><a className="button" href={beiraLinhaForm} target="_blank" rel="noreferrer">Ir para inscrição <span>↗</span></a></article>
      <article className="choice-card"><span>02 · Nova unidade</span><strong>Casa da Inovação<br/>São Pedro</strong><p>Rua São Pedro, 191, Loja 01 · ciclo 1</p><small>Games, Orquestra, Inglês e Inclusão Digital 60+.</small><a className="button" href={saoPedroForm} target="_blank" rel="noreferrer">Ir para inscrição <span>↗</span></a></article>
    </div></div>
  </main>;
}
