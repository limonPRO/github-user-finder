import { validationResult } from "express-validator";
import httpStatus from "http-status";

export const validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.errors.map(
      (error) => `${error.path} - ${error.msg}`
    );
    res.status(httpStatus.BAD_REQUEST).send(errorMessages);
    return;
  }
  next();
};
