"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBucket = void 0;
const check_bucket_1 = require("./check.bucket");
const create_bucket_1 = require("./create.bucket");
const logger_1 = __importDefault(require("../../logger/logger"));
/**
 * @name initBucket
 * @returns {void}
 */
const initBucket = async (s3) => {
    const bucketStatus = await (0, check_bucket_1.checkBucket)(s3, process.env.BUCKET_NAME);
    if (!bucketStatus.success) {
        // check if the bucket don't exist
        const bucket = await (0, create_bucket_1.createBucket)(s3); // create new bucket
        logger_1.default.debug(bucket.message);
    }
};
exports.initBucket = initBucket;
