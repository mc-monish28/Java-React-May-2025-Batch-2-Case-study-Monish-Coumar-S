export async function register({ username, password, email, phoneNumber }) {
  const res = await fetch("http://localhost:8080/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email, phoneNumber, role: "CUSTOMER" }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
}

export async function login({ email, password }) {
  const res = await fetch("http://localhost:8080/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function adminLogin({ email, password }) {
  const res = await fetch("http://localhost:8080/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
} 