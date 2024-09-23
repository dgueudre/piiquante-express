import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!err?.status) {
    console.error(err);
  }

  let status = err?.status || 500;
  let message =
    err?.message || 'Erreur interne du serveur. Veuillez réessayer plus tard.';
  let errors: ZodIssue[] | undefined;

  if (err instanceof ZodError) {
    status = 400;
    message = 'Bad request';
    errors = err.errors;
  }

  if (err.name === 'ValidationError') {
    status = 400;
  }

  res.status(status).json({
    status,
    message,
    errors,
  });
};
