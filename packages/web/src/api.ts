import axios from 'axios';

import { AuthPayload, ISauceEntity } from '@piiquante/shared';

import { ILoginPayload, ISaucePayload } from './validations';

const API_URL = 'http://localhost:3011';

const authHeaders = () => {
  const token = localStorage.getItem('token');

  return { headers: { Authorization: 'Bearer ' + token } };
};

const login = async ({ email, password }: ILoginPayload) => {
  const { data } = await axios.post<AuthPayload>(
    //
    `${API_URL}/api/auth/login`,
    { email, password }
  );

  return data;
};

const getAllSauces = async () => {
  const { data } = await axios.get<ISauceEntity[]>(
    `${API_URL}/api/sauces`,
    authHeaders()
  );

  return data;
};

const updateSauce = async (id: string, sauce: ISaucePayload) => {
  const { data } = await axios.put<ISaucePayload>(
    `${API_URL}/api/sauces/${id}`,
    sauce,
    authHeaders()
  );

  return data;
};

export const api = {
  login,
  getAllSauces,
  updateSauce,
};
