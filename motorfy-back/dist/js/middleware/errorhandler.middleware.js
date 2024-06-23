"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const validation_error_1 = require("../util/errors/validation.error");
const base_error_1 = require("../util/errors/base.error");
const logger_1 = __importDefault(require("../util/logger/logger"));
// error handler middleware
const errorHandler = (err, req, res, next) => {
    const response = {};
    if (err instanceof validation_error_1.ValidationError) {
        response.error = true;
        response.message = err.message;
        response.data = err.errorData;
        return res.status(err.status).json(response);
    }
    else if (err instanceof base_error_1.BaseError) {
        // log the error
        logger_1.default.error(`${err.message} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        // send generic error message
        response.error = true;
        response.message = err.message;
        return res.status(err.status).json(response);
    }
};
exports.errorHandler = errorHandler;
