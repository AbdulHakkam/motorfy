"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const base_error_1 = require("./base.error");
// validation error class
class ValidationError extends base_error_1.BaseError {
    errorData;
    constructor(data) {
        super(data[0].message, 400);
        this.errorData = data;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
