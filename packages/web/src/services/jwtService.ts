import { jwtDecode } from 'jwt-decode';

import { IJwtFullPayload, IJwtPayload } from '@piiquante/shared';

const store = (token: string) => {
  localStorage.setItem('token', token);
};

const clear = () => {
  localStorage.removeItem('token');
};

const load = (): string => {
  const token = localStorage.getItem('token');

  return token ?? '';
};

const decode = (): IJwtFullPayload | null => {
  const token = load();

  try {
    return jwtDecode<IJwtFullPayload>(token);
  } catch (e) {
    return null;
  }
};

const getPayload = (): IJwtFullPayload | null => {
  const decoded = decode();

  return decoded;
};

const isExpired = () => {
  const decoded = decode();

  const exp = decoded?.exp;

  return exp && Date.now() >= exp * 1000;
};

export const jwtService = {
  store,
  clear,
  getPayload,
  isExpired,
};
