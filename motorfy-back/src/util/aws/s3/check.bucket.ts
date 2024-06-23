import { S3 } from "aws-sdk";
import Logger from "../../logger/logger";
/**
 * @name checkBucket
 * @param {S3} s3
 * @returns {Promise<{success:boolean; message: string; data:string;}>}
 */
export const checkBucket = async (s3: S3, bucket: string) => {
  try {
    const res = await s3.headBucket({ Bucket: bucket }).promise();

    Logger.debug(`Bucket already Exist - ${res.$response.data}`);

    return { success: true, message: "Bucket already Exist", data: {} };
  } catch (error) {
    Logger.error(`Error bucket don't exsit - ${error.message}`);

    return { success: false, message: "Error bucket don't exsit", data: error };
  }
};
