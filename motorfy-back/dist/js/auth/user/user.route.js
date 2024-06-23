"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_middleware_1 = __importDefault(require("../../middleware/validator.middleware"));
const register_validation_1 = __importDefault(require("../../util/validation/register.validation"));
const ctrl = __importStar(require("./user.controller"));
const userauth_middleware_1 = require("../../middleware/userauth.middleware");
const login_validation_1 = __importDefault(require("../../util/validation/login.validation"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const userRouter = (0, express_1.Router)();
userRouter.post("/register", (0, validator_middleware_1.default)(register_validation_1.default), ctrl.registerUser);
userRouter.post("/login", (0, validator_middleware_1.default)(login_validation_1.default), ctrl.loginUser);
userRouter.post("/logout", auth_middleware_1.auth, userauth_middleware_1.userAuthorise, ctrl.logout);
exports.default = userRouter;
