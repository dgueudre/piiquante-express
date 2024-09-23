import createHttpError from 'http-errors';

import safe from '../services/safe';

export const notFound = safe(() => {
  throw createHttpError.NotFound();
});
