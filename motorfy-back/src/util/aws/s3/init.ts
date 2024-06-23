import { S3 } from "aws-sdk";
import { checkBucket } from "./check.bucket";
import { createBucket } from "./create.bucket";
import Logger from "../../logger/logger";
/**
 * @name initBucket
 * @returns {void}
 */
export const initBucket = async (s3: S3) => {
  const bucketStatus = await checkBucket(s3, process.env.BUCKET_NAME as string);

  if (!bucketStatus.success) {
    // check if the bucket don't exist
    const bucket = await createBucket(s3); // create new bucket

    Logger.debug(bucket.message);
  }
};
