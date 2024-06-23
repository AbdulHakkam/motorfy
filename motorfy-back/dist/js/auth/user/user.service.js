"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_error_1 = require("../../util/errors/general.error");
const user_model_1 = __importDefault(require("./user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Method to register user
 * @param {IUser} data Data of the user
 * @returns {boolean}
 */
const registerUser = async (data) => {
    const user = await user_model_1.default.findOne({ email: data.email });
    if (user) {
        //check otp already sent
        if (user)
            throw new general_error_1.GeneralError("User already exists", 500);
    }
    const hashPassword = await bcrypt_1.default.hash(data.password, Number(process.env.BCRYPT_SALT));
    //create register token
    const registerToken = crypto_1.default.randomInt(100000, 999999).toString();
    const hash = await bcrypt_1.default.hash(registerToken, Number(process.env.BCRYPT_SALT));
    const newUser = await new user_model_1.default({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashPassword,
    }).save();
    if (!newUser)
        throw new general_error_1.GeneralError("Failed to save user data", 500);
    return true;
};
/**
 * Method to login user
 * @param {string} email
 * @param {string} password
 * @returns {ILoginResponse}
 */
const loginUser = async (email, password) => {
    let returnData;
    //check user exist
    const userData = await user_model_1.default.findOne({ email: email });
    console.log(userData);
    if (userData) {
        //check password
        const isCorrect = await bcrypt_1.default.compare(password, userData.password);
        if (isCorrect) {
            const _id = userData._id.toString();
            const role = "user";
            const token = jsonwebtoken_1.default.sign({ _id, role }, process.env.JWT_SECRET, {
                expiresIn: "2 days",
            });
            // Update the token in the DB
            const updatedUser = await user_model_1.default.findByIdAndUpdate(userData._id, {
                sessionToken: token,
            });
            if (!updatedUser) {
                throw new general_error_1.GeneralError("Something went wrong", 500);
            }
            returnData = {
                _id: userData?._id,
                firstName: userData.firstName,
                email: userData?.email,
                token: token,
            };
        }
        else {
            throw new general_error_1.GeneralError("Invalid Username or Password", 401);
        }
    }
    else {
        throw new general_error_1.GeneralError("Invalid Username or Password", 401);
    }
    return returnData;
};
/**
 * Method to logout the user
 * @param {string} id
 */
const logoutUser = async (id) => {
    const data = await user_model_1.default.updateOne({ _id: id }, { $unset: { sessionToken: "" } });
    if (data.modifiedCount !== 1) {
        throw new general_error_1.GeneralError("Something went wrong while logging out", 500);
    }
};
exports.default = {
    registerUser,
    loginUser,
    logoutUser,
};
