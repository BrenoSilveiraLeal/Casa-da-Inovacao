import Link from "next/link";

export function InlineRegistration() {
  return <section id="pre-matricula" className="inline-registration section"><div><p className="eyebrow">PRÉ-INSCRIÇÃO · GRATUITA</p><h2>Sua próxima<br/><em>jornada começa aqui.</em></h2><p>Escolha a unidade e acesse o formulário correto para fazer sua pré-inscrição.</p></div><Link className="button" href="/pre-matricula">Escolher unidade <span>↗</span></Link></section>;
}
