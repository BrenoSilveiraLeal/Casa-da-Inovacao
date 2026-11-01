"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { courses, saoPedroCourses } from "./data";

type Unit = "beira" | "sao";
type AgeFilter = "all" | "kids" | "teens" | "adultos" | "60";
const ageLabels: Record<AgeFilter, string> = { all: "Todas as idades", kids: "Kids 8–11", teens: "Teens 12–17", adultos: "Adultos 18–59", "60": "60+" };
const ageFilterOrder: AgeFilter[] = ["all", "kids", "teens", "adultos", "60"];
function CourseIcon({ courseId }: { courseId: string }) {
  const icons: Record<string, React.ReactNode> = {
    ingles: <><path d="M4 5.5h10a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9l-4 3v-3.2a3 3 0 0 1-2-2.8v-5a3 3 0 0 1 1-2.2Z"/><path d="M8 9v4M6.5 11h3M12 12l1.2-3 1.2 3M12.5 11h1.4"/><path d="M17 8.5h2a2 2 0 0 1 2 2v5l-2.5-1.5"/></>,
    apps: <><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M3.5 8.5h17M7 6.5h.01M10 6.5h.01M9 12l-2 2 2 2M15 12l2 2-2 2M13.5 11.5l-2 5"/></>,
    robotica: <><path d="M12 4V2M9 2h6"/><rect x="4" y="6" width="16" height="14" rx="4"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M9 16h6M2 11v4M22 11v4"/></>,
    games: <><path d="M7 9h10a4 4 0 0 1 3.8 2.8l1.1 3.7a2 2 0 0 1-3.2 2.1L15.5 15h-7l-3.2 2.6a2 2 0 0 1-3.2-2.1l1.1-3.7A4 4 0 0 1 7 9Z"/><path d="M8 11.5v4M6 13.5h4"/><circle cx="16.5" cy="12.5" r=".8"/><circle cx="18.5" cy="14.5" r=".8"/></>,
    informatica18: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 8h10M7 11h6M7 14h8"/></>,
    informatica60: <><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10 5.5h4M11 18.5h2"/><circle cx="12" cy="11" r="2"/><path d="M8.5 15a4 4 0 0 1 7 0M19 8l2-2M20 11h2"/></>,
    musica: <><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></>,
  };
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[courseId] || <><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 9h8M8 12h8M8 15h5"/></>}</svg>;
}
function matchesAge(age: string, filter: AgeFilter) {
  if (filter === "all") return true;
  const text = age.toLowerCase();
  if (filter === "kids") return /kids|crianças|criancas|8[–-]11/.test(text);
  if (filter === "teens") return /teens|jovens|12[–-]17|15 anos/.test(text);
  if (filter === "adultos") return /adultos|15 anos|18[–-]59/.test(text);
  return /60\+|60 anos|melhor idade/.test(text);
}
function compactDays(schedule: string) {
  const day = schedule.split(" · ")[0];
  if (day.startsWith("Segunda")) return "Seg. / Qua.";
  if (day.startsWith("Terça-feira")) return "Terça";
  if (day.startsWith("Sexta-feira")) return "Sexta";
  if (day.startsWith("Terça")) return "Ter. / Qui.";
  return day;
}
function compactGameSchedules(schedules: string[]) {
  const rows: { key: string; day: string; label: string; times: string[] }[] = [];
  for (const schedule of schedules) {
    const [day, time = "", ...nameParts] = schedule.split(" · ");
    const label = nameParts.join(" · ");
    const group = label.match(/\b(?:Kids|Teens)\s+([A-Z])$/);
    const key = group ? `${day}-${group[1]}` : schedule;
    let row = rows.find(item => item.key === key);
    if (!row) {
      row = { key, day, label: group ? `Kids / Teens ${group[1]}` : label, times: [] };
      rows.push(row);
    }
    row.times.push(time);
  }
  return rows;
}
function CourseGrid({ unit, age }: { unit: Unit; age: AgeFilter }) {
  const list = unit === "beira" ? courses : saoPedroCourses;
  const filtered = list.filter(course => matchesAge(course.age, age));
  if (!filtered.length) return <div className="empty">Ainda não há turmas para essa idade nesta unidade. Confira a outra unidade ou fale com a equipe da Casa.</div>;
  return <div className="grid">{filtered.map(course => {
    const schedules = course.schedules.filter(schedule => {
      if (age === "all") return true;
      const s = schedule.toLowerCase();
      if (age === "kids") return /kids|criança|crianca/.test(s) || !/teens|adultos/.test(s);
      if (age === "teens") return /teens|jovem/.test(s) || !/kids|adultos/.test(s);
      if (age === "adultos") return /adultos|teens/.test(s) || !/kids/.test(s);
      return true;
    });
    const compactSchedules = course.id === "games" && unit === "sao" && age === "all";
    const scheduleRows = compactSchedules
      ? compactGameSchedules(schedules)
      : schedules.map(schedule => { const [day, time = "", ...name] = schedule.split(" · "); return { key: schedule, day, label: name.join(" · "), times: [time] }; });
    const href = unit === "beira" ? `/cursos/${course.id}` : `/cursos/sao-pedro/${course.id}`;
    return <article className={`card${compactSchedules?" compact-schedule":""}`} key={`${unit}-${course.id}`}>
      <div className="card-top"><span className="card-icon"><CourseIcon courseId={course.id}/></span><span className="cat">{course.category}</span></div>
      <div><h3><Link href={href}>{course.name}</Link></h3></div>
      <div className="ages"><span className="age">{course.age}</span></div>
      <p>{course.description || course.text}</p>
      <ul className="turmas">{scheduleRows.map(row=><li key={row.key}><span>{compactDays(row.day)}</span><small>{row.label}</small><b>{row.times.map(time=>compactSchedules?time.replace(/(\d{2})h–(\d{2})h/,"$1–$2h"):time).join(" / ")}</b></li>)}</ul>
    </article>;
  })}</div>;
}

export default function Home() {
  const [unit, setUnit] = useState<Unit>("beira");
  const [age, setAge] = useState<AgeFilter>("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const address = unit === "beira" ? "Rua Beira Linha, 329 · Teresópolis" : "Rua São Pedro, 191, Loja 01 · Teresópolis";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("in"); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll(".proposal-site .reveal").forEach(element => observer.observe(element));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);
  const nav = <><a href="#casa" onClick={() => setMenuOpen(false)}>A Casa</a><a href="#cursos" onClick={() => setMenuOpen(false)}>Cursos</a><a href="#historia" onClick={() => setMenuOpen(false)}>História</a><a href="#orquestra" onClick={() => setMenuOpen(false)}>Orquestra</a><a href="#local" onClick={() => setMenuOpen(false)}>Unidades</a></>;
  return <main className="proposal-site">
    <header className={`header${scrolled || menuOpen ? " scrolled" : ""}`} id="top"><div className="wrap">
      <a href="#top" className="logo" aria-label="Casa da Inovação"><img className="site-logo" src="/imagens/otimizadas/logo.webp" alt="" /><span className="logo-wordmark">Casa da<br/>Inovação</span></a>
      <nav className="nav" aria-label="Principal">{nav}</nav>
      <a href="/pre-matricula" className="btn btn-primary">Pr&#233;-inscri&#231;&#227;o gratuita</a>
      <button className="menu-btn" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={menuOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}/></svg></button>
    </div><nav className={`mobile-nav${menuOpen ? " open" : ""}`} aria-label="Menu móvel">{nav}<a href="/pre-matricula" className="btn btn-primary">Pr&#233;-inscri&#231;&#227;o gratuita</a></nav></header>
    <section className="hero"><div className="hero-bg" aria-hidden="true"/><div className="wrap"><div><h1>Casa da <em>Inova&#231;&#227;o</em><br/><span className="hero-subtitle">E. F. Therez&#243;polis.</span></h1><p className="sub">Cursos gratuitos de tecnologia, idiomas, m&#250;sica e inclus&#227;o digital para todas as idades.</p><div className="ctas"><a href="#cursos" className="btn btn-primary">Conhecer os cursos <span aria-hidden="true">&#8594;</span></a><a href="/pre-matricula" className="btn btn-ghost">Fazer pr&#233;-inscri&#231;&#227;o</a></div></div></div></section>
    <div className="stats"><div className="wrap"><div className="stat"><b>100%</b><span>gratuito, sem mensalidade</span></div><div className="stat"><b>6</b><span>cursos diferentes</span></div><div className="stat"><b>8 a 60+</b><span>anos: tem turma para todas as idades</span></div><div className="stat"><b>2</b><span>unidades em Teresópolis</span></div></div></div>
    <section className="about" id="casa"><div className="wrap"><div className="about-img reveal" role="img" aria-label="Espaço da Casa da Inovação"></div><div className="reveal"><span className="eyebrow">O que é a Casa</span><h2>Um espaço para criar <em>caminhos.</em></h2><p className="lead">A Casa da Inovação Estrada de Ferro Therezópolis é uma escola pública de habilidades digitais no bairro da Beira Linha. Aqui, a comunidade aprende tecnologia, idiomas e cidadania, de graça.</p><div className="pillars"><div className="pillar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5zM7 10.5V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-5.5"/></svg><b>Aprender fazendo</b><span>Aulas práticas, em turmas pequenas.</span></div><div className="pillar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5M17 9a2.5 2.5 0 1 0 0-5M16 14.6c2.8-.3 5 1.4 5.5 4.4"/></svg><b>Todas as idades</b><span>Dos 8 anos à melhor idade.</span></div><div className="pillar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 1 1-3-6.2M20 4v5h-5"/></svg><b>Para o futuro</b><span>Preparo para estudar e trabalhar.</span></div></div></div></div></section>
    <section className="courses dark" id="cursos"><div className="wrap"><div className="courses-head"><div className="reveal"><span className="eyebrow">Encontre sua turma</span><h2>Cursos, dias <em>e horários.</em></h2><p className="lead">Escolha a unidade e filtre pela idade de quem vai estudar.</p></div><div className="controls reveal"><div className="seg" role="tablist" aria-label="Unidade"><button type="button" className={unit === "beira" ? "on" : ""} role="tab" aria-selected={unit === "beira"} onClick={() => setUnit("beira")}>Beira Linha</button><button type="button" className={unit === "sao" ? "on" : ""} role="tab" aria-selected={unit === "sao"} onClick={() => setUnit("sao")}>São Pedro</button></div><div className="filters" aria-label="Filtrar por idade">{ageFilterOrder.map(filter => <button type="button" key={filter} className={age === filter ? "on" : ""} aria-pressed={age === filter} onClick={() => setAge(filter)}>{ageLabels[filter]}</button>)}</div><span className="unit-addr"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>{address}</span></div></div><CourseGrid unit={unit} age={age}/></div></section>
    <section className="history" id="historia"><div className="wrap"><div className="reveal"><span className="eyebrow">Nossa história</span><h2>Uma ideia que voltou <em>para casa.</em></h2><p className="lead">Da democratização da tecnologia em Nova Iguaçu à criação de novas oportunidades na Beira Linha, a Casa continua crescendo junto com a comunidade.</p></div><ol className="timeline reveal"><li><div className="year">2018</div><p>O conceito nasce em Nova Iguaçu.</p></li><li><div className="year">2019</div><p>Começam as articulações para Teresópolis.</p></li><li><div className="year">2022</div><p>A Casa abre suas portas na Beira Linha.</p></li><li className="now"><div className="year">Hoje</div><p>Nova unidade aberta em São Pedro.</p></li></ol></div></section>
    <section className="founder"><div className="wrap"><div className="founder-img reveal" role="img" aria-label="Alex Castellar, idealizador da Casa da Inovação"/><div className="reveal"><span className="eyebrow">Nosso idealizador</span><h2>Alex <em>Castellar</em></h2><p className="lead">Nascido e criado na Beira Linha, Alex transformou sua trajetória em compromisso com educação, tecnologia e inclusão.</p><blockquote>Em 2022, trouxe a Casa da Inovação para Teresópolis e para seu próprio bairro.</blockquote><p className="lead">O projeto nasceu para ampliar o acesso de jovens e adultos a uma formação de qualidade, com mais preparo para o mercado de trabalho, contato com a inovação e oportunidades de aprendizagem em tecnologia.</p></div></div></section>
    <section className="orchestra" id="orquestra"><div className="wrap"><div className="orch-img reveal" role="img" aria-label="Jovens tocando instrumentos na Orquestra Sustentável"/><div className="reveal"><span className="eyebrow">Orquestra Sustentável</span><h2>Quando a<br/>criatividade vira<br/><em>música.</em></h2><p className="lead">Crianças e jovens aprendem, criam e se apresentam numa experiência que une educação musical, cultura, sustentabilidade e comunidade.</p></div></div></section>
    <section className="band"><div className="wrap reveal"><span className="eyebrow">A Casa acontece</span><h2>Aprender é uma experiência <em>coletiva.</em></h2><p>Cada formatura é a prova de que, quando a comunidade tem acesso, ela vai longe.</p></div></section>
    <section className="location" id="local"><div className="wrap"><div className="location-heading"><span className="eyebrow">Venha conhecer</span><h2>A Casa está <em>perto de você.</em></h2></div><div className="units"><article className="unit"><span className="badge">Unidade sede</span><h3>Beira Linha</h3><p>Rua Beira Linha, 329<br/>Teresópolis · RJ</p><a href="https://www.google.com/maps/search/?api=1&query=Rua+Beira+Linha+329+Teresopolis+RJ" target="_blank" rel="noopener noreferrer">Como chegar →</a><div className="unit-contact"><a href="tel:+5521966907209">(21) 96690-7209</a><a href="mailto:casadainovacaoteresopolis@gmail.com">casadainovacaoteresopolis@gmail.com</a></div><iframe className="unit-map" title="Mapa da unidade Beira Linha" src="https://www.google.com/maps?q=Rua+Beira+Linha,+329,+Teresópolis,+RJ&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></article><article className="unit"><span className="badge">Nova unidade</span><h3>São Pedro</h3><p>Rua São Pedro, nº 191, Loja 01<br/>São Pedro, Teresópolis · RJ</p><a href="https://www.google.com/maps/search/?api=1&query=Rua+S%C3%A3o+Pedro+191+Loja+01+S%C3%A3o+Pedro+Teres%C3%B3polis+RJ" target="_blank" rel="noopener noreferrer">Como chegar →</a><div className="unit-contact"><a href="tel:+552120401220">(21) 2040-1220</a><a href="mailto:casadainovacaosaopedro@gmail.com">casadainovacaosaopedro@gmail.com</a></div><iframe className="unit-map" title="Mapa da unidade São Pedro" src="https://www.google.com/maps?q=Rua+São+Pedro,+191,+Loja+01,+Teresópolis,+RJ&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></article></div></div></section>
    <section className="signup dark" id="inscricao"><div className="wrap"><div className="reveal"><span className="eyebrow">Inscri&#231;&#245;es encerradas</span><h2>Sua pr&#243;xima<br/>jornada <em>come&#231;a<br/>aqui.</em></h2><p className="lead">As inscri&#231;&#245;es est&#227;o fechadas no momento. Acompanhe os canais da Casa para saber quando novas vagas estiverem dispon&#237;veis.</p><ol className="steps"><li><b>1</b>Veja os cursos e hor&#225;rios de cada unidade.</li><li><b>2</b>Escolha a unidade para consultar as informa&#231;&#245;es.</li><li><b>3</b>Acompanhe os canais da Casa para novas vagas.</li></ol></div><form className="reveal" aria-describedby="signup-closed-note"><div className="field full"><label htmlFor="signup-name">Nome completo</label><input id="signup-name" name="nome" autoComplete="name" placeholder="Como podemos te chamar?" disabled /></div><div className="field"><label htmlFor="signup-phone">WhatsApp</label><input id="signup-phone" name="telefone" type="tel" autoComplete="tel" placeholder="(21) 90000-0000" disabled /></div><div className="field"><label htmlFor="signup-email">E-mail <small>(opcional)</small></label><input id="signup-email" name="email" type="email" autoComplete="email" placeholder="voce@email.com" disabled /></div><div className="field"><label htmlFor="signup-course">Curso de interesse</label><select id="signup-course" name="curso" disabled><option value="">Inscri&#231;&#245;es encerradas</option>{courses.map(course=><option key={course.id} value={course.id}>{course.name}</option>)}</select></div><div className="field"><label htmlFor="signup-unit">Unidade</label><select id="signup-unit" name="unidade" disabled><option value="beira">Beira Linha</option><option value="sao">S&#227;o Pedro</option></select></div><div className="field full"><label htmlFor="signup-cpf">CPF</label><input id="signup-cpf" name="cpf" inputMode="numeric" placeholder="000.000.000-00" disabled /></div><p className="form-note" id="signup-closed-note">Inscri&#231;&#245;es encerradas no momento. O formul&#225;rio ser&#225; reaberto quando houver novas vagas.</p><a href="/pre-matricula" className="btn btn-primary">Ver unidades e cursos <span aria-hidden="true">&#8599;</span></a></form></div></section>
    <footer><div className="wrap"><div className="cols"><div className="footer-brand"><a href="#top" className="logo" aria-label="Casa da Inovação"><img className="site-logo" src="/imagens/otimizadas/logo.webp" alt="Casa da Inovação E. F. Therezópolis" /></a><p>Educação, tecnologia e oportunidades gratuitas para quem mora em Teresópolis.</p></div><div><h4>Navegação</h4><ul><li><a href="#casa">A Casa</a></li><li><a href="#cursos">Cursos e horários</a></li><li><a href="#historia">Nossa história</a></li><li><a href="/pre-matricula">Pré-inscrição</a></li></ul></div><div><h4>Atendimento</h4><p className="footer-contact-label">Beira Linha</p><ul><li><a href="tel:+5521966907209">(21) 96690-7209</a></li><li><a href="mailto:casadainovacaoteresopolis@gmail.com">casadainovacaoteresopolis@gmail.com</a></li></ul><p className="footer-contact-label">São Pedro</p><ul><li><a href="tel:+552120401220">(21) 2040-1220</a></li><li><a href="mailto:casadainovacaosaopedro@gmail.com">casadainovacaosaopedro@gmail.com</a></li></ul></div><div><h4>Redes</h4><ul><li><a href="https://www.instagram.com/casadainovacaoteresopolis/" target="_blank" rel="noopener noreferrer">Instagram · @casadainovacaoteresopolis</a></li><li><a href="https://www.facebook.com/casadainovacaoteresopolis/" target="_blank" rel="noopener noreferrer">Facebook · Casa da Inovação Teresópolis</a></li></ul></div></div><div className="bottom"><span>© Casa da Inovação E. F. Therezópolis</span><span>Cursos gratuitos para todas as idades.</span><span className="site-credit">Site desenvolvido por Breno Silveira &middot; <a href="https://www.instagram.com/bsl_silveira/" target="_blank" rel="noopener noreferrer">@bsl_silveira</a></span></div></div></footer>
    <a className="wa" href="https://wa.me/5521966907209" target="_blank" rel="noopener noreferrer" aria-label="Falar com a Casa pelo WhatsApp"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.4 11.6a8.4 8.4 0 0 1-12.3 7.5L4 20l.9-3.9a8.4 8.4 0 1 1 15.5-4.5Z"/><path d="M9.1 8.3c.2-.4.5-.4.7-.1l1 1.4c.2.3.1.6-.1.8l-.6.6c.6 1.2 1.6 2.1 2.7 2.7l.6-.6c.2-.2.5-.3.8-.1l1.4 1c.3.2.3.5-.1.7l-.8.5c-.4.2-.9.2-1.3 0-2.5-1.1-4.4-3-5.5-5.5-.2-.4-.2-.9 0-1.3l.5-.8Z"/></svg><span>Fale no WhatsApp</span></a>
    </main>;
}
