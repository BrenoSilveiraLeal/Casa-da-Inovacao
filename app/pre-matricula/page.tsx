"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type SubmitState = "idle" | "sending" | "error";

export default function Registration() {
  const [done, setDone] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/pre-matricula", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      if (!response.ok) throw new Error("submission_failed");
      setDone(true);
    } catch {
      setSubmitState("error");
    }
  }

  return <main className="registration">
    <header className="form-header">
      <Link href="/" className="brand"><span className="brand-mark">CI</span><span>CASA DA<br/><b>INOVAÇÃO</b></span></Link>
      <Link href="/">← Voltar ao site</Link>
    </header>
    <div className="form-shell">
      {done ? <div className="success">
        <span className="success-mark">✓</span>
        <p className="eyebrow">TUDO CERTO</p>
        <h1>Pré-matrícula<br/><em>enviada!</em></h1>
        <p>Sua inscrição foi registrada. A equipe da Casa da Inovação poderá entrar em contato pelos dados informados.</p>
        <Link className="button" href="/">Voltar para o site <span>↗</span></Link>
      </div> : <>
        <p className="eyebrow">PRÉ-MATRÍCULA · 01 / 01</p>
        <h1>Vamos abrir<br/><em>esse caminho?</em></h1>
        <p className="form-intro">Preencha seus dados e conte para a gente qual curso combina com você.</p>
        <form onSubmit={submit}>
          <label>Nome completo<input required name="nome" autoComplete="name" placeholder="Como podemos chamar você?" /></label>
          <label>E-mail<input required type="email" name="email" autoComplete="email" placeholder="voce@email.com" /></label>
          <label>Telefone<input required name="telefone" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" /></label>
          <label>Curso de interesse<select required name="curso" defaultValue="">
            <option value="" disabled>Escolha uma opção</option>
            <option value="robotica">Robótica</option>
            <option value="games">Criação de Games</option>
            <option value="informatica60">Informática 60+</option>
            <option value="ingles">Inglês</option>
            <option value="apps">Criação de Aplicativos</option>
          </select></label>
          {submitState === "error" && <p role="alert" aria-live="polite">Não foi possível enviar agora. Confira os dados e tente novamente.</p>}
          <button className="button" type="submit" disabled={submitState === "sending"}>{submitState === "sending" ? "Enviando…" : "Enviar pré-matrícula"} <span>↗</span></button>
          <small>Ao enviar, seus dados serão usados pela equipe da Casa para dar continuidade ao atendimento.</small>
        </form>
      </>}
    </div>
  </main>;
}
