"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBucket = void 0;
const logger_1 = __importDefault(require("../../logger/logger"));
/**
 * @name createBucket
 * @param {S3} s3
 * @returns {Promise<{success:boolean; message: string; data: string;}>}
 */
const createBucket = async (s3) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        CreateBucketConfiguration: {
            // Set your region here
            LocationConstraint: "us-east-2",
        },
    };
    try {
        const res = await s3.createBucket(params).promise();
        logger_1.default.debug(`Bucket Created Successfull - ${res.Location}`);
        return {
            success: true,
            message: "Bucket Created Successfull",
            data: res.Location,
        };
    }
    catch (error) {
        logger_1.default.error(`Error: Unable to create bucket - ${error.message}`);
        return { success: false, message: "Unable to create bucket", data: error };
    }
};
exports.createBucket = createBucket;
