import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../util/errors/validation.error";
import { BaseError } from "../util/errors/base.error";
import { IResponse } from "../types/response.type";
import Logger from "../util/logger/logger";

// error handler middleware
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response: IResponse<Record<string, string>[]> = {};
  if (err instanceof ValidationError) {
    response.error = true;
    response.message = err.message;
    response.data = err.errorData;

    return res.status(err.status).json(response);
  } else if (err instanceof BaseError) {
    // log the error
    Logger.error(
      `${err.message} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    // send generic error message
    response.error = true;
    response.message = err.message;

    return res.status(err.status).json(response);
  }
};

export { errorHandler };
