import createHttpError from 'http-errors';
import { sign, verify } from 'jsonwebtoken';

import { JwtPayload } from '@piiquante/shared';

import { JWT_SECRET } from '../configuration';

export const jwtService = {
  sign: (payload: JwtPayload) => {
    return sign(payload, JWT_SECRET, { expiresIn: '24h' });
  },
  verify: (token: string): JwtPayload => {
    try {
      return verify(token, JWT_SECRET) as JwtPayload;
    } catch (error: any) {
      throw createHttpError.Unauthorized(error?.message);
    }
  },
};
