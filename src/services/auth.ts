import { RequestHandler } from 'express';

import { jwtService } from './jwtService';
import safe from './safe';

// On doit autoriser à ajouter le user à la Request
declare global {
  namespace Express {
    interface Request {
      auth?: any;
    }
  }
}

const unsafeAuth: RequestHandler = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error('Unauthorized');
    }
    const [_, token] = req.headers.authorization?.split(' ') || [];
    const decodedToken = jwtService.verify(token);
    const { userId } = decodedToken;
    req.auth = { userId };
    next();
  } catch (error: any) {
    if (['TokenExpiredError', 'JsonWebTokenError'].includes(error.name)) {
      return res
        .status(401)
        .json({ message: 'Must be logged in to access this resource.' });
    }
    throw error;
  }
};

export const auth = safe(unsafeAuth);
