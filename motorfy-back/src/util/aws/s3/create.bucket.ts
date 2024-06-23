import { S3 } from "aws-sdk";
import { CreateBucketRequest } from "aws-sdk/clients/s3";
import Logger from "../../logger/logger";

/**
 * @name createBucket
 * @param {S3} s3
 * @returns {Promise<{success:boolean; message: string; data: string;}>}
 */
export const createBucket = async (s3: S3) => {
  const params: CreateBucketRequest = {
    Bucket: process.env.BUCKET_NAME as string,
    CreateBucketConfiguration: {
      // Set your region here
      LocationConstraint: "us-east-2",
    },
  };

  try {
    const res = await s3.createBucket(params).promise();

    Logger.debug(`Bucket Created Successfull - ${res.Location}`);

    return {
      success: true,
      message: "Bucket Created Successfull",
      data: res.Location,
    };
  } catch (error) {
    Logger.error(`Error: Unable to create bucket - ${error.message}`);

    return { success: false, message: "Unable to create bucket", data: error };
  }
};
