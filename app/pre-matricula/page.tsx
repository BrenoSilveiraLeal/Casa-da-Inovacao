import Link from "next/link";
import { getCoursesForUnit, getUnit, units } from "../units";
import { registrationConfig } from "../registration";

export const metadata = { title: "Pré-matrícula | Casa da Inovação", description: "Escolha a unidade da Casa da Inovação onde você quer estudar." };

export default async function RegistrationChoice({ searchParams }: { searchParams: Promise<{ unidade?: string }> }) {
  const { unidade } = await searchParams;
  const selected = unidade ? getUnit(unidade) : undefined;
  if (selected) {
    const config = registrationConfig[selected.id];
    const selectedCourses = getCoursesForUnit(selected.id);
    return <main className="registration choice-page"><header className="form-header"><Link href="/" className="brand"><span className="brand-mark">CI</span><span>CASA DA<br /><b>INOVAÇÃO</b></span></Link><Link href="/pre-matricula">Trocar unidade</Link></header><div className="choice-shell"><p className="eyebrow">UNIDADE SELECIONADA · {selected.cycle}º CICLO</p><h1>Você está se inscrevendo em:<br /><em>{selected.name}</em></h1><p className="form-intro">Confira os cursos disponíveis nesta unidade antes de seguir para a pré-matrícula.</p><div className="selected-unit-context"><strong>Casa da Inovação {selected.name}</strong>{selected.address ? <span>{selected.address}</span> : <span>Endereço em atualização</span>}<span>{selectedCourses.length} cursos disponíveis</span>{selected.contactEmail && <span>Contato: {selected.contactEmail}</span>}</div><div className="choice-course-list">{selectedCourses.map((course) => <div key={course.id}><strong>{course.shortName ?? course.name}</strong><span>{course.age}</span></div>)}</div>{config.formUrl ? <a className="button" href={config.formUrl} target="_blank" rel="noreferrer">Continuar para o Google Forms <span>↗</span></a> : <div className="pending-registration"><strong>Google Forms de São Pedro em preparação</strong><span>O link oficial será inserido aqui assim que o formulário for criado. A unidade começará a funcionar em breve.</span></div>}<Link className="text-link" href="/pre-matricula">← Escolher outra unidade</Link></div></main>;
  }
  return <main className="registration choice-page"><header className="form-header"><Link href="/" className="brand"><span className="brand-mark">CI</span><span>CASA DA<br /><b>INOVAÇÃO</b></span></Link><Link href="/">← Voltar ao site</Link></header><div className="choice-shell"><p className="eyebrow">PRÉ-MATRÍCULA · PRIMEIRO PASSO</p><h1>Onde você<br /><em>quer estudar?</em></h1><p className="form-intro">Escolha a unidade para ver os cursos e seguir para o formulário correto. Você poderá trocar de unidade a qualquer momento.</p><div className="choice-grid">{units.map((unit) => <article className="choice-card" key={unit.id}><div><span>{unit.label}</span><strong>{unit.name}</strong><p>{unit.cycle}º ciclo · {unit.courseIds.length} cursos</p>{unit.address ? <small>{unit.address}</small> : <small>Endereço em atualização</small>}</div><Link className="button" href={`/pre-matricula?unidade=${unit.slug}`}>Escolher {unit.name} <span>↗</span></Link></article>)}</div></div></main>;
}
