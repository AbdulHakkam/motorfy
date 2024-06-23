import bcrypt from "bcrypt";
import { Request } from "express";
import * as crypto from "crypto";

/**
 * Util Method to compare password using bcrypt
 * @param {string} inputPassword
 * @param {string} userPassword
 * @returns {Promise<boolean>}
 */
export const comparePassword = async (
  inputPassword: string,
  userPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, userPassword);
};

/**
 * Util Method to get token from header
 * @param {Request} req
 * @returns {string}
 */
export const getTokenFromHeader = (req: Request): string | undefined => {
  return req.header("Authorization")?.replace("Bearer ", "");
};

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
export const encrypt = (jsonObj: object) => {
  const jsonString = JSON.stringify(jsonObj);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(jsonString, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};
