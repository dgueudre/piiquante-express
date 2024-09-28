import createHttpError from 'http-errors';
import { sign, verify } from 'jsonwebtoken';

import { IJwtFullPayload, IJwtPayload } from '@piiquante/shared';

import { JWT_SECRET } from '../configuration';

export const jwtService = {
  sign: (payload: IJwtPayload) => {
    return sign(payload, JWT_SECRET, { expiresIn: '24h' });
  },
  verify: (token: string): IJwtFullPayload => {
    try {
      return verify(token, JWT_SECRET) as IJwtFullPayload;
    } catch (error: any) {
      throw createHttpError.Unauthorized(error?.message);
    }
  },
};
