/* O retorno usa navegação HTML completa para funcionar também no export estático. */
/* eslint-disable @next/next/no-html-link-for-pages */
import { notFound } from "next/navigation";
import { courses } from "../../data";

export function generateStaticParams() {
  return courses.map((course) => ({ id: course.id }));
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);
  if (!course) notFound();
  return <main className="course-detail-page">
    <header className="course-detail-header"><a href="/#horarios">← <span>Voltar para cursos</span></a><span className="course-detail-kicker">CURSO GRATUITO · {course.category}</span></header>
    <section className="course-detail-hero"><p className="eyebrow">{course.category}</p><h1>{course.name}</h1><p className="course-detail-intro">{course.description ?? course.text}</p></section>
    <section className="course-detail-content"><div className="course-detail-copy"><p className="eyebrow">O QUE VOCÊ VAI APRENDER</p><h2>Aprender <span className="course-title-word">fazendo</span><br/><em>abre caminhos.</em></h2><p>{course.learning ?? course.text}</p><p>As atividades são pensadas para o ritmo da turma, com prática, troca e acompanhamento da equipe.</p></div><div className="course-detail-info"><div><span>FAIXA ETÁRIA</span><strong>{course.age}</strong></div><div className="course-schedules"><span>TURMAS E HORÁRIOS</span>{course.schedules.map((schedule) => <strong key={schedule}>{schedule}</strong>)}</div><span className="button button-disabled" aria-disabled="true">Inscrições encerradas</span></div></section>
  </main>;
}
