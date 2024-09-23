import { Request, RequestHandler } from 'express';

import safe from '../services/safe';

const isMultipartRequest = (req: Request): boolean => {
  const contentType = req.headers['content-type'];

  return contentType?.indexOf('multipart/form-data') !== -1;
};

const toJson =
  (fieldName: string): RequestHandler =>
  (req, res, next) => {
    if (!isMultipartRequest(req)) {
      next();
      return;
    }

    const { body, file, protocol } = req;
    req.body = JSON.parse(body[fieldName]);

    if (file) {
      req.body.imageUrl = `${protocol}://${req.get('host')}/images/${file.filename}`;
    }

    next();
  };

export const multipart = {
  toJson: (fieldName: string) => safe(toJson(fieldName)),
};
