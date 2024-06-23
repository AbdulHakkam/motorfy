import { uploadToS3 } from "../util/aws/s3/image.upload";
import { initBucket } from "../util/aws/s3/init";
import { GeneralError } from "../util/errors/general.error";
import Advertisement from "./advertisement.model";
import {
  IAdvertisementFilter,
  IAdvertisementModel,
} from "./advertisement.type";
import { S3 } from "aws-sdk";
import fs from "fs";
import { Request } from "express";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const publishAdvertisement = async (
  data: IAdvertisementModel,
  files: Express.Multer.File[]
) => {
  const neededUrls: string[] = [];
  await initBucket(s3);
  try {
    if (files.length == 0) {
      throw new GeneralError("U need to add at least one image", 500);
    } else {
      for (const element of files) {
        // Upload the url the s3
        const res = await uploadToS3(
          s3,
          `${Math.floor(Math.random() * 1000000)}`,
          element
        );
        if (!res.success) {
          throw new GeneralError("Failed to upload image", 500);
        }
        neededUrls.push(res.data);
        // After url is uploaded delete the existing file
        fs.unlinkSync(element.path);
      }
    }
    data.images = neededUrls;
    data.title = `${data.make} ${data.vehicleModel} ${data.year}`;
    const advertisement = await new Advertisement(data).save();
  } catch (error) {
    console.log(error);
    throw new GeneralError("Failed to publish advertisement", 400);
  }

  return true;
};

const getPaginatedAdvertisements = async (page: number, limit: number) => {
  const advertisements: Array<any> = await Advertisement.find()
    .populate("sellerId", "firstName lastName")
    .skip((page - 1) * limit)
    .limit(limit);
  const data = advertisements as IAdvertisementModel[];
  return data;
};

const getFilteredAdvertisements = async (req: Request) => {
  const data: IAdvertisementFilter = req.body;
  const { page, limit } = req.query;
  console.log(data);
  const filters: { [key: string]: any } = {};
  if (data.type) filters.type = data.type;
  if (data.make) filters.make = data.make;
  if (data.vehicleModel) filters.vehicleModel = data.vehicleModel;
  if (data.text) {
    filters["$and"] = [
      // ...filters["$and"],
      {
        $or: [
          { title: new RegExp(data.text.replaceAll(" ", "|"), "i") },
          { description: new RegExp(data.text.replaceAll(" ", "|"), "i") },
        ],
      },
    ];
  }
  if (data.transmission) filters.transmission = data.transmission;
  if (data.fuel) filters.fuel = data.fuel;
  if (data.priceFrom !== undefined && data.priceTo != undefined)
    filters.price = { $gte: data.priceFrom, $lte: data.priceTo };
  if (data.mileageFrom !== undefined && data.mileageTo != undefined)
    filters.mileage = { $gte: data.mileageFrom, $lte: data.mileageTo };
  if (data.yearFrom !== undefined && data.yearTo != undefined)
    filters.year = { $gte: data.yearFrom, $lte: data.yearTo };
  if (
    data.engineCapacityFrom !== undefined &&
    data.engineCapacityTo != undefined
  )
    filters.engineCapacity = {
      $gte: data.engineCapacityFrom,
      $lte: data.engineCapacityTo,
    };
  if (data.location) filters.location = { $all: data.location };

  const options = {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
  };

  const advertisements: Array<any> = await Advertisement.find(filters)
    .sort(
      data.sort && data.order
        ? { [data.sort]: parseInt(data.order ?? "1", 10) as -1 | 1 }
        : { createdAt: -1 }
    )
    .skip((options.page - 1) * options.limit)
    .limit(options.limit);
  return advertisements as IAdvertisementModel[];
};
export default {
  publishAdvertisement,
  getPaginatedAdvertisements,
  getFilteredAdvertisements,
};
