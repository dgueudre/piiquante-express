import { RequestHandler } from 'express';

import { jwtService } from '../services/jwtService';
import safe from '../services/safe';

const unsafeJwtGuard: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(' ').pop() ?? '';
  const { userId } = jwtService.verify(token);
  req.auth = { userId };
  next();
};

export const jwtGuard = safe(unsafeJwtGuard);
