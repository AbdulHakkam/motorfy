"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthorise = void 0;
const auth_1 = __importDefault(require("../util/constants/auth"));
const auth_error_1 = require("../util/errors/auth.error");
const user_model_1 = __importDefault(require("../auth/user/user.model"));
const userAuthorise = async (req, _, next) => {
    const { role } = req.body.token;
    const token = req.cookies["token"];
    if (role !== auth_1.default.roles.USER) {
        return next(new auth_error_1.AuthError("User do not have permission"));
    }
    const user = await user_model_1.default.findOne({ sessionToken: token });
    if (!user) {
        return next(new auth_error_1.AuthError("User Session expired"));
    }
    next();
};
exports.userAuthorise = userAuthorise;
