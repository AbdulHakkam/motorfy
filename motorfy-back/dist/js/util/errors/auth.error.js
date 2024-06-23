"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const base_error_1 = require("./base.error");
// validation error class
class AuthError extends base_error_1.BaseError {
    constructor(message) {
        super(message, 401);
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}
exports.AuthError = AuthError;
