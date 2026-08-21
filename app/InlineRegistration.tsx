"use client";
import { FormEvent, useState } from "react";

export function InlineRegistration() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/pre-matricula", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form.entries())) });
    if (!response.ok) { setError("Não foi possível enviar agora. Confira os dados e tente novamente."); return; }
    setSent(true);
  }
  if (sent) return <section id="pre-matricula" className="inline-registration section"><p className="eyebrow">TUDO CERTO</p><h2>Pré-matrícula<br/><em>recebida.</em></h2><p>Seus dados foram enviados para a equipe da Casa da Inovação. Em breve entraremos em contato.</p><button className="button" onClick={() => setSent(false)}>Enviar outra inscrição <span>↗</span></button></section>;
  return <section id="pre-matricula" className="inline-registration section"><div><p className="eyebrow">PRÉ-MATRÍCULA · GRATUITA</p><h2>Sua próxima<br/><em>jornada começa aqui.</em></h2><p>Deixe seus dados e escolha o curso de seu interesse.</p></div><form onSubmit={submit}><label>Nome<input required name="nome" /></label><label>Telefone<input required name="telefone" inputMode="tel" placeholder="(21) 00000-0000" /></label><label>E-mail<input required type="email" name="email" placeholder="voce@email.com" /></label><label>Curso de interesse<select required name="curso" defaultValue=""><option value="" disabled>Escolha uma opção</option><option>Robótica</option><option>Desenvolvimento de Games</option><option>Inclusão Digital 60+</option><option>Introdução à Informática</option><option>Introdução à Língua Inglesa</option><option>Criação de Aplicativos</option><option>Música</option></select></label>{error && <p role="alert">{error}</p>}<button className="button" type="submit">Enviar pré-matrícula <span>↗</span></button></form></section>;
}
