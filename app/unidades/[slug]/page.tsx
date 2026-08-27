import Link from "next/link";
import { notFound } from "next/navigation";
import { getCoursesForUnit, getUnit, units } from "../../units";

export function generateStaticParams() { return units.map((unit) => ({ slug: unit.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = getUnit(slug);
  return { title: unit ? `Casa da Inovação ${unit.name} | Teresópolis` : "Unidade | Casa da Inovação", description: unit?.description };
}

export default async function UnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = getUnit(slug);
  if (!unit) notFound();
  const unitCourses = getCoursesForUnit(unit.id);
  return <main className={`unit-detail-page unit-detail-${unit.id}`}><header className="unit-detail-header"><Link href="/#unidades">← <span>Voltar para unidades</span></Link><Link className="button button-small" href={`/pre-matricula?unidade=${unit.slug}`}>Fazer pré-matrícula ↗</Link></header><section className="unit-detail-hero"><div><p className="eyebrow">{unit.label} · {unit.cycle}º CICLO</p><h1>Casa da<br /><em>Inovação</em><br />{unit.name}</h1><p>{unit.description}</p></div><div className="unit-detail-stamp"><strong>{unit.cycle}º</strong><span>ciclo<br />em andamento</span></div></section><section className="unit-detail-content"><div><p className="eyebrow">CURSOS DESTA UNIDADE</p><h2>Um caminho para<br /><em>cada interesse.</em></h2></div><div className="unit-course-list">{unitCourses.map((course) => <Link className="unit-course-row" href={`/cursos/${course.id}`} key={course.id}><strong>{course.shortName ?? course.name}</strong><span>{course.age}</span><span>Ver curso ↗</span></Link>)}</div></section><section className="unit-detail-contact"><div><p className="eyebrow">ONDE ESTAMOS</p><h2>{unit.name}</h2><p>{unit.address ?? "O endereço exato desta unidade será divulgado em breve."}</p>{unit.mapsUrl ? <a className="text-link" href={unit.mapsUrl} target="_blank" rel="noreferrer">Como chegar no Google Maps ↗</a> : <span className="pending-data">Link do Maps em atualização</span>}{unit.mapEmbedUrl && <iframe className="unit-detail-map" title={`Mapa da unidade ${unit.name}`} src={unit.mapEmbedUrl} loading="lazy" />}</div><div className="unit-detail-note"><strong>Unidade selecionada</strong><span>Você está conhecendo a Casa da Inovação {unit.name}.</span><Link className="button" href={`/pre-matricula?unidade=${unit.slug}`}>Escolher {unit.name} <span>↗</span></Link></div></section></main>;
}
