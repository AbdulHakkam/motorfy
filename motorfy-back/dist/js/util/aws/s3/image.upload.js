"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = void 0;
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../../logger/logger"));
/**
 * @name uploadToS3
 * @param {S3} s3
 * @param {string} folderName
 * @param {File} fileData
 * @returns {Promise<{success:boolean; message: string; data: object;}>}
 */
const uploadToS3 = async (s3, folderName, fileData) => {
    try {
        const fileContent = fs_1.default.readFileSync(fileData.path);
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${folderName}/${fileData.originalname}`,
            Body: fileContent,
            ACL: "public-read",
        };
        try {
            const res = await s3.upload(params).promise();
            logger_1.default.debug(`File Uploaded with Successfull - ${res.Location}`);
            return {
                success: true,
                message: "File Uploaded with Successfull",
                data: res.Location,
            };
        }
        catch (error) {
            logger_1.default.error(`Unable to Upload the file - ${error.message}`);
            return {
                success: false,
                message: "Unable to Upload the file",
                data: error,
            };
        }
    }
    catch (error) {
        logger_1.default.error(`Unalbe to access this file - ${error.message}`);
        return { success: false, message: "Unalbe to access this file", data: {} };
    }
};
exports.uploadToS3 = uploadToS3;
