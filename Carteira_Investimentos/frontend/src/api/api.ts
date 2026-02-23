const BASE_URL = 'http://localhost:8080';

export const api = async (endpoint: string, config?: RequestInit) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ${response.status}: ${errorText}`);
  }

  return response.json();
};
