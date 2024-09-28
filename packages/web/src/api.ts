import axios from 'axios';

import { AuthPayload, ISauce } from '@piiquante/shared';

const API_URL = 'http://localhost:3011';

const authHeaders = () => {
  const token = localStorage.getItem('token');

  return { headers: { Authorization: 'Bearer ' + token } };
};

const login = async (email: string, password: string) => {
  const { data } = await axios.post<AuthPayload>(
    //
    `${API_URL}/api/auth/login`,
    { email, password }
  );

  return data;
};

const getAllSauces = async () => {
  const { data } = await axios.get<ISauce[]>(
    `${API_URL}/api/sauces`,
    authHeaders()
  );

  return data;
};

const updateSauce = async (sauce: ISauce) => {
  const { data } = await axios.put<ISauce>(
    `${API_URL}/api/sauces/${sauce._id}`,
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
