import { BaseError } from "./base.error";

// validation error class
class ValidationError extends BaseError {
  errorData: Record<string, string>[];
  constructor(data: Record<string, string>[]) {
    super(data[0].message, 400);
    this.errorData = data;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export { ValidationError };
