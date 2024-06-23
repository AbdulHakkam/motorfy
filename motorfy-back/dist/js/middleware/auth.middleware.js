"use strict";
/*
middleware for authenticate request -jwt
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_error_1 = require("../util/errors/auth.error");
const validation_1 = __importDefault(require("../util/common/validation"));
const auth = async (req, res, next) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            return next(new auth_error_1.AuthError("Please authenticate"));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.token = decoded;
        const { _id } = req.body.token;
        if (!(0, validation_1.default)(_id)) {
            return next(new auth_error_1.AuthError("Invalid token"));
        }
        res.header("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN || "http://localhost:3001");
        next();
    }
    catch (err) {
        next(new auth_error_1.AuthError("Please authenticate"));
    }
};
exports.auth = auth;
