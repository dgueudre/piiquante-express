import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = err?.status || 500;
  let message =
    err?.message || 'Erreur interne du serveur. Veuillez réessayer plus tard.';
  let errors: ZodIssue[] | undefined;

  if (err instanceof ZodError) {
    status = 400;
    message = 'Bad request';
    errors = err.errors;
  }

  if (!status) {
    console.error(err);
  }

  res.status(status).json({
    status,
    message,
    errors,
  });
};
