import axios, { RawAxiosRequestHeaders } from 'axios';

import {
  AuthPayload,
  ILoginPayload,
  ISauceEntity,
  ISaucePayload,
} from '@piiquante/shared';

import { ISauceWithFilePayload } from './components/sauceWithFileSchema';

const API_URL = 'http://localhost:3011';

const authHeaders = (): RawAxiosRequestHeaders => {
  const token = localStorage.getItem('token');

  return { Authorization: 'Bearer ' + token };
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
  const { data } = await axios.get<ISauceEntity[]>(`${API_URL}/api/sauces`, {
    headers: authHeaders(),
  });

  return data;
};

const updateSauce = async (id: string, sauce: ISauceWithFilePayload) => {
  let body: FormData | ISaucePayload;
  console.log(sauce);
  const { file, ...newSauce } = sauce;

  if (file?.length === 1) {
    body = new FormData();
    body.append('image', file[0]);
    body.append('sauce', JSON.stringify(newSauce));
  } else {
    body = newSauce;
  }

  console.log(body);

  const { data } = await axios.put<ISaucePayload>(
    `${API_URL}/api/sauces/${id}`,
    body,
    { headers: authHeaders() }
  );

  return data;
};

export const api = {
  login,
  getAllSauces,
  updateSauce,
};
