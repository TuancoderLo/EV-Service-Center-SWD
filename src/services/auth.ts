import { api } from "./api";

export type Role = "member" | "staff" | "technician" | "admin";
export type User = { id: string; name: string; email: string; role: Role };

export async function login(payload: { email: string; password: string }) {
  const { data } = await api.post("/auth/login", payload);
  return data as { access_token?: string; user: User };
}

export async function register(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const { data } = await api.post("/auth/register", payload);
  return data as { id: string };
}

export async function me() {
  const { data } = await api.get("/auth/me");
  return data as User;
}
