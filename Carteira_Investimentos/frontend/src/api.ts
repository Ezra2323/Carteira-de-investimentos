// src/api/api.ts
const BASE_URL = 'http://localhost:8080';

export const api = async (endpoint: string, config?: RequestInit) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
};
