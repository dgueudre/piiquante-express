import { AuthPayload } from '@piiquante/shared';

const API_URL = 'http://localhost:3011/api';

const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const auth: AuthPayload = await response.json();

  console.log(auth);

  return auth;
};

const getAllSauces = async () => {
  const response = await fetch(`${API_URL}/sauces`);

  const sauces = await response.json();

  console.log(sauces);

  return sauces;
};

export const api = {
  login,
  getAllSauces,
};
