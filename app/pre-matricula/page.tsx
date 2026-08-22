"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type SubmitState = "idle" | "sending" | "error";

const classOptions: Record<string, string[]> = {
  games: ["Kids - Segunda e Quarta (15h às 16h)"],
  robotica: ["Teens - Segunda e Quarta (14h às 15h)"],
  inclusao: ["Terça e Quinta (11h às 12h)"],
  informatica: ["Teens - Segunda e Quarta (11h às 12h)"],
  ingles: ["Segunda e Quarta (9h às 10h)"],
  aplicativos: ["Segunda e Quarta (10h às 11h)"],
  musica: ["Segunda e Quarta (14h às 15h) Flauta"],
};

export default function Registration() {
  const [done, setDone] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [course, setCourse] = useState("");

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
        <span className="success-mark">✓</span><p className="eyebrow">TUDO CERTO</p>
        <h1>Pré-matrícula<br/><em>enviada!</em></h1>
        <p>Sua inscrição foi registrada. A equipe da Casa da Inovação poderá entrar em contato pelos dados informados.</p>
        <Link className="button" href="/">Voltar para o site <span>↗</span></Link>
      </div> : <>
        <p className="eyebrow">PRÉ-MATRÍCULA · 01 / 01</p>
        <h1>Vamos abrir<br/><em>esse caminho?</em></h1>
        <p className="form-intro">Preencha os dados abaixo para fazer sua pré-inscrição.</p>
        <form onSubmit={submit}>
          <label>Nome do responsável<input required name="responsavel" autoComplete="name" placeholder="Nome completo do responsável" /></label>
          <label>CPF<input required name="cpf" inputMode="numeric" placeholder="000.000.000-00" /></label>
          <label>Telefone<input required name="telefone" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" /></label>
          <label>Nome completo do aluno<input required name="aluno" placeholder="Nome completo do aluno" /></label>
          <label>Data de nascimento<input required type="date" name="nascimento" /></label>
          <label>Idade do aluno<input required type="number" name="idade" min="1" max="120" placeholder="Idade" /></label>
          <label>Rua<input required name="rua" autoComplete="street-address" placeholder="Rua" /></label>
          <label>Número<input required name="numero" inputMode="numeric" placeholder="Número" /></label>
          <label>Complemento<input name="complemento" placeholder="Apartamento, casa etc. (opcional)" /></label>
          <label>Bairro<input required name="bairro" placeholder="Bairro" /></label>
          <label>CEP<input required name="cep" inputMode="numeric" placeholder="00000-000" /></label>
          <label>PCD ou diagnóstico<select required name="diagnostico" defaultValue=""><option value="" disabled>Escolha uma opção</option><option value="Não">Não</option><option value="Sim">Sim</option></select></label>
          <label>Como conheceu a Casa?<select required name="origem" defaultValue=""><option value="" disabled>Escolha uma opção</option><option>Instagram</option><option>Jornal</option><option>Carro de som</option><option>Indicação</option><option>Outro</option></select></label>
          <label>Já fez curso na Casa?<select required name="jaFezCurso" defaultValue=""><option value="" disabled>Escolha uma opção</option><option>Sim</option><option>Não</option></select></label>
          <label>Curso de interesse<select required name="curso" value={course} onChange={(event) => setCourse(event.target.value)}><option value="" disabled>Escolha uma opção</option><option value="robotica">Robótica</option><option value="games">Criação de Games</option><option value="informatica">Informática 18+</option><option value="inclusao">Inclusão 60+</option><option value="ingles">Inglês</option><option value="aplicativos">Criação de Aplicativos</option><option value="musica">Música</option></select></label>
          <label>Turma e horário<select required name="turma" defaultValue="" disabled={!course}><option value="" disabled>{course ? "Escolha uma turma" : "Escolha primeiro o curso"}</option>{(classOptions[course] ?? []).map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="form-consent"><input required type="checkbox" name="consentimento" /> Estou ciente de que esta é uma pré-inscrição e que devo comparecer à Casa para confirmar a matrícula.</label>
          {submitState === "error" && <p role="alert" aria-live="polite">Não foi possível enviar agora. Confira os dados e tente novamente.</p>}
          <button className="button" type="submit" disabled={submitState === "sending"}>{submitState === "sending" ? "Enviando…" : "Enviar pré-matrícula"} <span>↗</span></button>
          <small>Seus dados serão encaminhados para a planilha de pré-inscrições da Casa.</small>
        </form>
      </>}
    </div>
  </main>;
}
