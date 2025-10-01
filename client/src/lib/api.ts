// Auth API endpoints and logic
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AUTH_ENDPOINTS = {
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
};

export async function registerUser(email: string, password: string) {
  const res = await fetch(AUTH_ENDPOINTS.register, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(AUTH_ENDPOINTS.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function logoutUser(email: string, password: string) {
  const res = await fetch(AUTH_ENDPOINTS.logout, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Logout failed");
  return res.json();
}
