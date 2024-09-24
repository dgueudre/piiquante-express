import axios, { AxiosError } from 'axios';

import { AuthPayload, ISauce } from '@piiquante/shared';

const API_URL = 'http://localhost:3011/api';

const login = async (email: string, password: string) => {
  const { data } = await axios.post<AuthPayload>(
    //
    `${API_URL}/auth/login`,
    { email, password }
  );

  return data;
};

const getAllSauces = async () => {
  const { data } = await axios.get<ISauce[]>(`${API_URL}/sauces`);

  return data;
};

export const api = {
  login,
  getAllSauces,
};
