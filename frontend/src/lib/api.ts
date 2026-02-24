const API_BASE = "/api";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || res.statusText);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// ── Auth ──────────────────────────────────────────────
export const api = {
  register(data: { email: string; name: string; password: string }) {
    return request<any>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  login(data: { email: string; password: string }) {
    return request<{ access_token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  me() {
    return request<any>("/auth/me");
  },

  // ── Teams ─────────────────────────────────────────────
  getTeams() {
    return request<any[]>("/teams/");
  },

  createTeam(data: { name: string; description?: string }) {
    return request<any>("/teams/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getTeam(id: string) {
    return request<any>(`/teams/${id}`);
  },

  addMember(teamId: string, data: { email: string; role?: string }) {
    return request<any>(`/teams/${teamId}/members`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  removeMember(teamId: string, userId: string) {
    return request<void>(`/teams/${teamId}/members/${userId}`, {
      method: "DELETE",
    });
  },

  deleteTeam(id: string) {
    return request<void>(`/teams/${id}`, { method: "DELETE" });
  },

  // ── Emails ────────────────────────────────────────────
  shareEmail(data: {
    subject: string;
    sender: string;
    body: string;
    tag?: string;
    team_id: string;
  }) {
    return request<any>("/emails/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getTeamEmails(teamId: string, tag?: string, search?: string) {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    if (search) params.set("search", search);
    const qs = params.toString();
    return request<any[]>(`/emails/team/${teamId}${qs ? `?${qs}` : ""}`);
  },

  getEmail(id: string) {
    return request<any>(`/emails/${id}`);
  },

  deleteEmail(id: string) {
    return request<void>(`/emails/${id}`, { method: "DELETE" });
  },
};
