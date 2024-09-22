import { RequestHandler } from 'express-serve-static-core';

function safe(middleware: RequestHandler): RequestHandler {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (error: any) {
      const { message } = error;
      res.status(500).json({ message });
      next(error);
    }
  };
}

export default safe;
