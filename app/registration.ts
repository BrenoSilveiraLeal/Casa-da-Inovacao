import type { UnitId } from "./units";
export const registrationConfig: Record<UnitId, { formUrl?: string; endpoint: string; status: "ready" | "pending" }> = {
  "beira-linha": { formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdUgwMVjn7P-t4hZxPQ8pxbdKvaJLssmjazlcooW8n8mWnLXQ/viewform", endpoint: "/api/pre-matricula", status: "ready" },
  "sao-pedro": { endpoint: "/api/pre-matricula/sao-pedro", status: "pending" },
};
