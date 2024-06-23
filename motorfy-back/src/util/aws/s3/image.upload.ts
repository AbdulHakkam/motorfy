import { S3 } from "aws-sdk";
import fs from "fs";
import Logger from "../../logger/logger";

/**
 * @name uploadToS3
 * @param {S3} s3
 * @param {string} folderName
 * @param {File} fileData
 * @returns {Promise<{success:boolean; message: string; data: object;}>}
 */
export const uploadToS3 = async (
  s3: S3,
  folderName: string,
  fileData?: Express.Multer.File
) => {
  try {
    const fileContent = fs.readFileSync(fileData!.path);

    const params = {
      Bucket: process.env.BUCKET_NAME as string,
      Key: `${folderName}/${fileData!.originalname}`,
      Body: fileContent,
      ACL: "public-read",
    };

    try {
      const res = await s3.upload(params).promise();
      Logger.debug(`File Uploaded with Successfull - ${res.Location}`);

      return {
        success: true,
        message: "File Uploaded with Successfull",
        data: res.Location,
      };
    } catch (error) {
      Logger.error(`Unable to Upload the file - ${error.message}`);
      return {
        success: false,
        message: "Unable to Upload the file",
        data: error,
      };
    }
  } catch (error) {
    Logger.error(`Unalbe to access this file - ${error.message}`);
    return { success: false, message: "Unalbe to access this file", data: {} };
  }
};
