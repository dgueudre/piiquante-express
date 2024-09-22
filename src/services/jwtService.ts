import { sign, verify } from 'jsonwebtoken';

import { JWT_SECRET } from '../configuration';

export type JwtPayload = {
  userId: string;
};

export const jwtService = {
  sign: (payload: JwtPayload) => {
    return sign(payload, JWT_SECRET, { expiresIn: '24h' });
  },
  verify: (token: string): JwtPayload => {
    return verify(token, JWT_SECRET) as JwtPayload;
  },
};
