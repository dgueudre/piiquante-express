import { RequestHandler } from 'express';

function safe(middleware: RequestHandler): RequestHandler {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (error: any) {
      next(error);
    }
  };
}

export default safe;
