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
exports.encrypt = exports.getTokenFromHeader = exports.comparePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto = __importStar(require("crypto"));
/**
 * Util Method to compare password using bcrypt
 * @param {string} inputPassword
 * @param {string} userPassword
 * @returns {Promise<boolean>}
 */
const comparePassword = async (inputPassword, userPassword) => {
    return await bcrypt_1.default.compare(inputPassword, userPassword);
};
exports.comparePassword = comparePassword;
/**
 * Util Method to get token from header
 * @param {Request} req
 * @returns {string}
 */
const getTokenFromHeader = (req) => {
    return req.header("Authorization")?.replace("Bearer ", "");
};
exports.getTokenFromHeader = getTokenFromHeader;
// Generate a key and IV for AES encryption
const algorithm = "aes-256-cbc";
const key = crypto
    .createHash("sha256")
    .update(process.env.ENCRYPT_SECRET || "mysecretkey1234567890abcdef")
    .digest();
6;
const iv = Buffer.from(process.env.ENCRYPT_IV || "1234567890abcdef");
/**
 * Encrypts a JSON object.
 * @param jsonObj - The JSON object to encrypt.
 * @param key - The encryption key.
 * @param iv - The initialization vector.
 * @returns The encrypted data as an object containing the IV and encrypted content.
 */
const encrypt = (jsonObj) => {
    const jsonString = JSON.stringify(jsonObj);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(jsonString, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};
exports.encrypt = encrypt;
