import { NextResponse } from "next/server";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdUgwMVjn7P-t4hZxPQ8pxbdKvaJLssmjazlcooW8n8mWnLXQ/formResponse";

const courseEntries: Record<string, string> = {
  games: "entry.2071814470",
  robotica: "entry.780404863",
  inclusao: "entry.1528011459",
  informatica: "entry.2134755458",
  ingles: "entry.1878971111",
  aplicativos: "entry.475672709",
  musica: "entry.76910292",
};

export async function POST(request: Request) {
  try {
    const data = await request.json() as Record<string, string | undefined>;
    if (!data.nome && !data.aluno) return NextResponse.json({ ok: false, error: "nome_obrigatorio" }, { status: 400 });
    if (!data.telefone) return NextResponse.json({ ok: false, error: "telefone_obrigatorio" }, { status: 400 });
    const form = new URLSearchParams();
    const fields: Record<string, string> = {
      "entry.249163521": data.responsavel ?? "",
      "entry.101288017": data.cpf ?? "",
      "entry.2018607794": data.telefone ?? "",
      "entry.1784202265": data.rua ?? "",
      "entry.87140964": data.numero ?? "",
      "entry.382582810": data.complemento ?? "",
      "entry.1317594193": data.bairro ?? "",
      "entry.1989299998": data.cep ?? "",
      "entry.1889617700": data.aluno ?? data.nome ?? "",
      "entry.941858255": [data.diagnostico, data.diagnosticoDetalhe].filter(Boolean).join(" — "),
      "entry.1248872807": data.nascimento ?? "",
      "entry.1755046487": data.idade ?? "",
      "entry.1620871548": data.origem ?? "",
      "entry.180705265": data.jaFezCurso ?? "",
      "entry.1246315988": "Estou ciente",
    };
    for (const [key, value] of Object.entries(fields)) form.append(key, value);
    const courseEntry = courseEntries[data.curso ?? ""];
    if (courseEntry) form.append(courseEntry, data.turma ?? "");

    const response = await fetch(FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      redirect: "manual",
    });
    if (!response.ok && response.status !== 302) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
