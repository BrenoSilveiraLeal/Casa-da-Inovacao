"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { courses, saoPedroCourses } from "./data";
import "./proposal-home.css";

type Unit = "beira" | "sao";
type AgeFilter = "all" | "kids" | "teens" | "adultos" | "60";
const ageLabels: Record<AgeFilter, string> = { all: "Todas as idades", kids: "Kids 8–11", teens: "Teens 12–17", adultos: "Adultos 18–59", "60": "60+" };
function CategoryIcon({ category }: { category: string }) {
  const paths: Record<string, React.ReactNode> = {
    Tecnologia: <><rect x="4" y="5" width="16" height="13" rx="2"/><path d="M8 21h8M12 18v3M8 10h.01M12 10h.01M16 10h.01M8 14h8"/></>,
    Idiomas: <><path d="M4 5h11M9.5 3v2M6 5c.5 4 3.5 7 7 8M13 5c-.5 3-2.5 5.5-5 7M14 20l4-10 4 10M15.5 17h5"/></>,
    Música: <><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></>,
    Cidadania: <><path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z"/></>,
  };
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[category] || <><path d="M12 3v18M3 12h18"/></>}</svg>;
}
function matchesAge(age: string, filter: AgeFilter) {
  if (filter === "all") return true;
  const text = age.toLowerCase();
  if (filter === "kids") return /kids|crianças|criancas|8[–-]11/.test(text);
  if (filter === "teens") return /teens|jovens|12[–-]17|15 anos/.test(text);
  if (filter === "adultos") return /adultos|15 anos|18[–-]59/.test(text);
  return /60\+|60 anos|melhor idade/.test(text);
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
    const href = unit === "beira" ? `/cursos/${course.id}` : `/cursos/sao-pedro/${course.id}`;
    return <article className="card" key={`${unit}-${course.id}`}>
      <div className="card-top"><span className="card-icon"><CategoryIcon category={course.category}/></span><span className="cat">{course.category}</span></div>
      <div><h3><Link href={href}>{course.name}</Link></h3></div>
      <div className="ages"><span className="age">{course.age}</span></div>
      <p>{course.description || course.text}</p>
      <ul className="turmas">{schedules.map((schedule, index) => <li key={`${schedule}-${index}`}><span>{schedule.split(" · ")[0]}</span><small>{schedule.split(" · ").slice(2).join(" · ")}</small><b>{schedule.split(" · ")[1] || ""}</b></li>)}</ul>
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
  const nav = <><a href="#casa" onClick={() => setMenuOpen(false)}>A Casa</a><a href="#cursos" onClick={() => setMenuOpen(false)}>Cursos</a><a href="#historia" onClick={() => setMenuOpen(false)}>História</a><a href="#local" onClick={() => setMenuOpen(false)}>Unidades</a></>;
  return <main className="proposal-site">
    <header className={`header${scrolled || menuOpen ? " scrolled" : ""}`} id="top"><div className="wrap">
      <a href="#top" className="logo" aria-label="Casa da Inovação"><img className="site-logo" src="/imagens/otimizadas/logo.webp" alt="" /><span className="logo-wordmark">Casa da<br/>Inovação</span></a>
      <nav className="nav" aria-label="Principal">{nav}</nav>
      <a href="/pre-matricula" className="btn btn-primary">Pré-inscrição gratuita</a>
      <button className="menu-btn" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={menuOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}/></svg></button>
    </div><nav className={`mobile-nav${menuOpen ? " open" : ""}`} aria-label="Menu móvel">{nav}<a href="/pre-matricula" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Pré-inscrição gratuita</a></nav></header>
    <section className="hero"><div className="hero-bg" aria-hidden="true"/><div className="wrap"><div><span className="pill"><span className="dot"/>Teres&#243;polis &#183; RJ &#183; desde 2022</span><h1>Casa da <em>Inova&#231;&#227;o</em><br/><span className="hero-subtitle">E. F. Therez&#243;polis.</span></h1><p className="sub">Cursos gratuitos de tecnologia, idiomas, m&#250;sica e inclus&#227;o digital para todas as idades.</p><div className="ctas"><a href="#cursos" className="btn btn-primary">Conhecer os cursos <span aria-hidden="true">&#8594;</span></a><a href="/pre-matricula" className="btn btn-ghost">Fazer pr&#233;-inscri&#231;&#227;o</a></div></div></div></section>
    <div className="stats"><div className="wrap"><div className="stat"><b>100%</b><span>gratuito, sem mensalidade</span></div><div className="stat"><b>6</b><span>cursos diferentes</span></div><div className="stat"><b>8 a 60+</b><span>anos: tem turma para todas as idades</span></div><div className="stat"><b>2</b><span>unidades em Teresópolis</span></div></div></div>
    <section className="about" id="casa"><div className="wrap"><div className="about-img reveal" role="img" aria-label="Espaço da Casa da Inovação"><div className="tag"><span className="icon-circle" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg></span><div><b>Escola pública de habilidades digitais</b>Rua Beira Linha, 329 · Teresópolis</div></div></div><div className="reveal"><span className="eyebrow">O que é a Casa</span><h2>Um espaço para criar <em>caminhos.</em></h2><p className="lead">A Casa da Inovação Estrada de Ferro Therezópolis é uma escola pública de habilidades digitais no bairro da Beira Linha. Aqui, a comunidade aprende tecnologia, idiomas e cidadania, de graça.</p><div className="pillars"><div className="pillar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5zM7 10.5V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-5.5"/></svg><b>Aprender fazendo</b><span>Aulas práticas, em turmas pequenas.</span></div><div className="pillar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5M17 9a2.5 2.5 0 1 0 0-5M16 14.6c2.8-.3 5 1.4 5.5 4.4"/></svg><b>Todas as idades</b><span>Dos 8 anos à melhor idade.</span></div><div className="pillar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 1 1-3-6.2M20 4v5h-5"/></svg><b>Para o futuro</b><span>Preparo para estudar e trabalhar.</span></div></div></div></div></section>
    <section className="courses dark" id="cursos"><div className="wrap"><div className="courses-head"><div className="reveal"><span className="eyebrow">Encontre sua turma</span><h2>Cursos, dias <em>e horários.</em></h2><p className="lead">Escolha a unidade e filtre pela idade de quem vai estudar.</p></div><div className="controls reveal"><div className="seg" role="tablist" aria-label="Unidade"><button type="button" className={unit === "beira" ? "on" : ""} role="tab" aria-selected={unit === "beira"} onClick={() => setUnit("beira")}>Beira Linha</button><button type="button" className={unit === "sao" ? "on" : ""} role="tab" aria-selected={unit === "sao"} onClick={() => setUnit("sao")}>São Pedro</button></div><div className="filters" aria-label="Filtrar por idade">{(Object.keys(ageLabels) as AgeFilter[]).map(filter => <button type="button" key={filter} className={age === filter ? "on" : ""} aria-pressed={age === filter} onClick={() => setAge(filter)}>{ageLabels[filter]}</button>)}</div><span className="unit-addr"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>{address}</span></div></div><CourseGrid unit={unit} age={age}/></div></section>
    <section className="history" id="historia"><div className="wrap"><div className="reveal"><span className="eyebrow">Nossa história</span><h2>Uma ideia que voltou <em>para casa.</em></h2><p className="lead">Da democratização da tecnologia em Nova Iguaçu à criação de novas oportunidades na Beira Linha, a Casa continua crescendo junto com a comunidade.</p></div><ol className="timeline reveal"><li><div className="year">2018</div><p>O conceito nasce em Nova Iguaçu.</p></li><li><div className="year">2019</div><p>Começam as articulações para Teresópolis.</p></li><li><div className="year">2022</div><p>A Casa abre suas portas na Beira Linha.</p></li><li className="now"><div className="year">Hoje</div><p>Nova unidade aberta em São Pedro.</p></li></ol></div></section>
    <section className="founder"><div className="wrap"><div className="founder-img reveal" role="img" aria-label="Alex Castellar, idealizador da Casa da Inovação"/><div className="reveal"><span className="eyebrow">Nosso idealizador</span><h2>Alex <em>Castellar</em></h2><p className="lead">Nascido e criado na Beira Linha, Alex transformou sua trajetória em compromisso com educação, tecnologia e inclusão.</p><blockquote>Em 2022, trouxe a Casa da Inovação para Teresópolis e para seu próprio bairro.</blockquote><p className="lead">O projeto nasceu para ampliar o acesso de jovens e adultos a uma formação de qualidade, com mais preparo para o mercado de trabalho, contato com a inovação e oportunidades de aprendizagem em tecnologia.</p></div></div></section>
    <section className="band"><div className="wrap reveal"><span className="eyebrow">A Casa acontece</span><h2>Aprender é uma experiência <em>coletiva.</em></h2><p>Cada formatura é a prova de que, quando a comunidade tem acesso, ela vai longe.</p></div></section>
    <section className="location" id="local"><div className="wrap"><div className="location-heading"><span className="eyebrow">Venha conhecer</span><h2>A Casa está <em>perto de você.</em></h2></div><div className="units"><article className="unit"><span className="badge">Unidade sede</span><h3>Beira Linha</h3><p>Rua Beira Linha, 329<br/>Teresópolis · RJ</p><a href="https://www.google.com/maps/search/?api=1&query=Rua+Beira+Linha+329+Teresopolis+RJ" target="_blank" rel="noopener noreferrer">Como chegar →</a><iframe className="unit-map" title="Mapa da unidade Beira Linha" src="https://www.google.com/maps?q=Rua+Beira+Linha,+329,+Teresópolis,+RJ&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></article><article className="unit"><span className="badge">Nova unidade</span><h3>São Pedro</h3><p>Rua São Pedro, nº 191, Loja 01<br/>São Pedro, Teresópolis · RJ</p><a href="https://www.google.com/maps/search/?api=1&query=Rua+S%C3%A3o+Pedro+191+Loja+01+S%C3%A3o+Pedro+Teres%C3%B3polis+RJ" target="_blank" rel="noopener noreferrer">Como chegar →</a><iframe className="unit-map" title="Mapa da unidade São Pedro" src="https://www.google.com/maps?q=Rua+São+Pedro,+191,+Loja+01,+Teresópolis,+RJ&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></article></div></div></section>
    <section className="signup dark" id="inscricao"><div className="wrap"><div className="reveal"><span className="eyebrow">Pré-inscrição · escolha uma unidade</span><h2>Sua próxima jornada <em>começa aqui.</em></h2><p className="lead">Escolha a Casa mais próxima para ver as opções de inscrição e os cursos disponíveis em cada unidade.</p><ol className="steps"><li><b>1</b>Selecione Beira Linha ou São Pedro.</li><li><b>2</b>Confira os cursos e horários da unidade.</li><li><b>3</b>Continue para o formulário correspondente.</li></ol><Link href="/pre-matricula" className="btn btn-primary">Escolher uma unidade <span aria-hidden="true">→</span></Link></div><div className="signup-photo reveal" role="img" aria-label="Fachada da Casa da Inovação"/></div></section>
    <footer><div className="wrap"><div className="cols"><div className="footer-brand"><a href="#top" className="logo" aria-label="Casa da Inovação"><img className="site-logo" src="/imagens/otimizadas/logo.webp" alt="Casa da Inovação E. F. Therezópolis" /></a><p>Educação, tecnologia e oportunidades gratuitas para quem mora em Teresópolis.</p></div><div><h4>Navegação</h4><ul><li><a href="#casa">A Casa</a></li><li><a href="#cursos">Cursos e horários</a></li><li><a href="#historia">Nossa história</a></li><li><a href="/pre-matricula">Pré-inscrição</a></li></ul></div><div><h4>Atendimento</h4><ul><li><a href="https://wa.me/5521966907209">(21) 96690-7209</a></li><li><a href="mailto:casadainovacaoteresopolis@gmail.com">casadainovacaoteresopolis@gmail.com</a></li></ul></div><div><h4>Redes</h4><ul><li><a href="https://www.instagram.com/casadainovacaoteresopolis/" target="_blank" rel="noopener noreferrer">Instagram · @casadainovacaoteresopolis</a></li></ul></div></div><div className="bottom"><span>© Casa da Inovação E. F. Therezópolis</span><span>Cursos gratuitos para todas as idades.</span></div></div></footer>
    <a className="wa" href="https://wa.me/5521966907209" target="_blank" rel="noopener" aria-label="Falar no WhatsApp"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg><span>Fale no WhatsApp</span></a>
    </main>;
}
