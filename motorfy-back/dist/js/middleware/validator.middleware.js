"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_error_1 = require("../util/errors/validation.error");
const logger_1 = __importDefault(require("../util/logger/logger"));
const validatorMiddleware = (validator) => {
    return async (req, res, next) => {
        try {
            await validator.validateAsync(req.body);
            next();
        }
        catch (error) {
            logger_1.default.error(error);
            next(new validation_error_1.ValidationError(error.details));
        }
    };
};
exports.default = validatorMiddleware;
