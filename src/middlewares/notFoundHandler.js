import { NotFound } from 'http-errors';

export const notFoundHandler = (req, res, next) =>
  next(new NotFound('Route not found'));
