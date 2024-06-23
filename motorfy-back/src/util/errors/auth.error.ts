import { BaseError } from "./base.error";

// validation error class
class AuthError extends BaseError {
  constructor(message: string) {
    super(message, 401);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export { AuthError };
