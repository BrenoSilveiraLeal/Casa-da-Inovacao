/* O retorno usa navegação HTML completa para funcionar também no export estático. */
/* eslint-disable @next/next/no-html-link-for-pages */
import { notFound } from "next/navigation";
import { saoPedroCourses } from "../../../data";

export function generateStaticParams() {
  return saoPedroCourses.map((course) => ({ id: course.id }));
}

export default async function SaoPedroCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = saoPedroCourses.find((item) => item.id === id);
  if (!course) notFound();

  return <main className="course-detail-page">
    <header className="course-detail-header"><a href="/#horarios">← <span>Voltar para cursos</span></a><span className="course-detail-kicker">SÃO PEDRO · CURSO GRATUITO · {course.category}</span></header>
    <section className="course-detail-hero"><p className="eyebrow">SÃO PEDRO · {course.category}</p><h1>{course.name}</h1><p className="course-detail-intro">{course.description}</p></section>
    <section className="course-detail-content"><div className="course-detail-copy"><p className="eyebrow">O QUE VOCÊ VAI APRENDER</p><h2>Aprender <span className="course-title-word">fazendo</span><br/><em>abre caminhos.</em></h2><p>{course.learning}</p><p>As atividades são pensadas para o ritmo da turma, com prática, troca e acompanhamento da equipe.</p></div><div className="course-detail-info"><div><span>FAIXA ETÁRIA</span><strong>{course.age}</strong></div><div className="course-schedules"><span>TURMAS E HORÁRIOS</span>{course.schedules.map((schedule) => <strong key={schedule}>{schedule}</strong>)}</div><a className="button" href={`/pre-matricula?unidade=sao-pedro&curso=${course.id}`}>Fazer pré-inscrição <span>↗</span></a></div></section>
  </main>;
}
