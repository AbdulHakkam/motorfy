import { BaseError } from "./base.error";

class GeneralError extends BaseError {
  constructor(message: string, code: number) {
    super(message, code);
    Object.setPrototypeOf(this, GeneralError.prototype);
  }
}

export { GeneralError };
