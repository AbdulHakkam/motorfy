import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../util/errors/validation.error";
import { ObjectSchema } from "joi";
import Logger from "../util/logger/logger";

const validatorMiddleware = (validator: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validator.validateAsync(req.body);

      next();
    } catch (error) {
      Logger.error(error);
      next(new ValidationError(error.details));
    }
  };
};

export default validatorMiddleware;
