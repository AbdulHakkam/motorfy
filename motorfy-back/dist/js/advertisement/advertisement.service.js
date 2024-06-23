"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_upload_1 = require("../util/aws/s3/image.upload");
const init_1 = require("../util/aws/s3/init");
const general_error_1 = require("../util/errors/general.error");
const advertisement_model_1 = __importDefault(require("./advertisement.model"));
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
const s3 = new aws_sdk_1.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const publishAdvertisement = async (data, files) => {
    const neededUrls = [];
    await (0, init_1.initBucket)(s3);
    try {
        if (files.length == 0) {
            throw new general_error_1.GeneralError("U need to add at least one image", 500);
        }
        else {
            for (const element of files) {
                // Upload the url the s3
                const res = await (0, image_upload_1.uploadToS3)(s3, `${Math.floor(Math.random() * 1000000)}`, element);
                if (!res.success) {
                    throw new general_error_1.GeneralError("Failed to upload image", 500);
                }
                neededUrls.push(res.data);
                // After url is uploaded delete the existing file
                fs_1.default.unlinkSync(element.path);
            }
        }
        data.images = neededUrls;
        data.title = `${data.make} ${data.vehicleModel} ${data.year}`;
        const advertisement = await new advertisement_model_1.default(data).save();
    }
    catch (error) {
        console.log(error);
        throw new general_error_1.GeneralError("Failed to publish advertisement", 400);
    }
    return true;
};
const getPaginatedAdvertisements = async (page, limit) => {
    const advertisements = await advertisement_model_1.default.find()
        .populate("sellerId", "firstName lastName")
        .skip((page - 1) * limit)
        .limit(limit);
    const data = advertisements;
    return data;
};
const getFilteredAdvertisements = async (req) => {
    const data = req.body;
    const { page, limit } = req.query;
    console.log(data);
    const filters = {};
    if (data.type)
        filters.type = data.type;
    if (data.make)
        filters.make = data.make;
    if (data.vehicleModel)
        filters.vehicleModel = data.vehicleModel;
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
    if (data.transmission)
        filters.transmission = data.transmission;
    if (data.fuel)
        filters.fuel = data.fuel;
    if (data.priceFrom !== undefined && data.priceTo != undefined)
        filters.price = { $gte: data.priceFrom, $lte: data.priceTo };
    if (data.mileageFrom !== undefined && data.mileageTo != undefined)
        filters.mileage = { $gte: data.mileageFrom, $lte: data.mileageTo };
    if (data.yearFrom !== undefined && data.yearTo != undefined)
        filters.year = { $gte: data.yearFrom, $lte: data.yearTo };
    if (data.engineCapacityFrom !== undefined &&
        data.engineCapacityTo != undefined)
        filters.engineCapacity = {
            $gte: data.engineCapacityFrom,
            $lte: data.engineCapacityTo,
        };
    if (data.location)
        filters.location = { $all: data.location };
    const options = {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
    };
    const advertisements = await advertisement_model_1.default.find(filters)
        .sort(data.sort && data.order
        ? { [data.sort]: parseInt(data.order ?? "1", 10) }
        : { createdAt: -1 })
        .skip((options.page - 1) * options.limit)
        .limit(options.limit);
    return advertisements;
};
exports.default = {
    publishAdvertisement,
    getPaginatedAdvertisements,
    getFilteredAdvertisements,
};
