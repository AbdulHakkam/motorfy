"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().lowercase().required().messages({
        "any.required": "Email is required",
        "email.base": "Email must be a valid email",
    }),
    password: joi_1.default.string().min(5).required().messages({
        "string.min": "Password must contain atleast 5 charachters",
        "any.required": "Password is required",
    }),
});
exports.default = loginSchema;
