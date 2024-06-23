"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBucket = void 0;
const logger_1 = __importDefault(require("../../logger/logger"));
/**
 * @name checkBucket
 * @param {S3} s3
 * @returns {Promise<{success:boolean; message: string; data:string;}>}
 */
const checkBucket = async (s3, bucket) => {
    try {
        const res = await s3.headBucket({ Bucket: bucket }).promise();
        logger_1.default.debug(`Bucket already Exist - ${res.$response.data}`);
        return { success: true, message: "Bucket already Exist", data: {} };
    }
    catch (error) {
        logger_1.default.error(`Error bucket don't exsit - ${error.message}`);
        return { success: false, message: "Error bucket don't exsit", data: error };
    }
};
exports.checkBucket = checkBucket;
