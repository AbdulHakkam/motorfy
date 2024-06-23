"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
// base error class
class BaseError extends Error {
    status;
    isOperational;
    constructor(message, status, isOperational = true) {
        super(message);
        this.status = status;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}
exports.BaseError = BaseError;
