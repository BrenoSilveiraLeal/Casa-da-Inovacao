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

export default async function handler(request: any, response: any) {
  if (request.method !== "POST") {
    response.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  try {
    const data = typeof request.body === "string" ? JSON.parse(request.body) : request.body ?? {};
    if (!data.nome && !data.aluno) {
      response.status(400).json({ ok: false, error: "nome_obrigatorio" });
      return;
    }
    if (!data.telefone) {
      response.status(400).json({ ok: false, error: "telefone_obrigatorio" });
      return;
    }

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

    const result = await fetch(FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      redirect: "manual",
    });

    if (!result.ok && result.status !== 302) {
      response.status(502).json({ ok: false });
      return;
    }
    response.status(200).json({ ok: true });
  } catch {
    response.status(400).json({ ok: false, error: "invalid_request" });
  }
}
