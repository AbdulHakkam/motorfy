"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.loginUser = exports.registerUser = void 0;
const user_service_1 = __importDefault(require("./user.service"));
/**
 * Control register user
 */
const registerUser = async (req, res, next) => {
    try {
        const body = req.body;
        const response = {};
        //store user
        await user_service_1.default.registerUser(body);
        response.error = false;
        response.message = "Registered successfully";
        res.status(200).json(response);
    }
    catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
};
exports.registerUser = registerUser;
const logout = async (req, res, next) => {
    try {
        const { token } = req.body;
        await user_service_1.default.logoutUser(token._id);
        const response = {};
        response.error = false;
        response.message = "User logged out successfully";
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
        });
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
/**
 * Control user login
 */
const loginUser = async (req, res, next) => {
    try {
        const body = req.body;
        const response = {};
        const userData = await user_service_1.default.loginUser(body.email, body.password);
        response.error = false;
        response.message = "Successfully Logged in";
        response.data = userData;
        res.cookie("token", userData.token, {
            httpOnly: true,
            secure: false,
        });
        res.header("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN || "http://localhost:3001");
        return res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
