import { RequestHandler } from 'express';

function safe<T>(middleware: RequestHandler<T>): RequestHandler<T> {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (error: any) {
      next(error);
    }
  };
}

export default safe;
