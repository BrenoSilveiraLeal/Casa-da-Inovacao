import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, error: "inscricoes_encerradas" },
    { status: 410 },
  );
}
