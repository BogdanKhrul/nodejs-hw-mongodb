import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const errors = err.details
      ? err.details.map((detail) => detail.message)
      : [err.message];
    next(createHttpError(400, 'Bad Request', { data: { errors } }));
  }
};
