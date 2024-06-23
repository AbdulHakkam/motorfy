import { NextFunction, Response, Request } from "express";
import { IResponse } from "../types/response.type";
import advertisementService from "./advertisement.service";
import mongoose from "mongoose";
import { IAdvertisementModel } from "./advertisement.type";

const publishAdvertisement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("publishing advertisement");
    const body = req.body;
    const response: IResponse<string> = {};
    const files = req.files as Express.Multer.File[];
    const { _id } = body.token;
    req.body.sellerId = new mongoose.Types.ObjectId(_id);
    await advertisementService.publishAdvertisement(body, files);
    response.error = false;
    response.message = "Published successfully";

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getPaginatedAdvertisements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response: IResponse<IAdvertisementModel[]> = {};
    const { page, limit } = req.query;
    const advertisements =
      await advertisementService.getPaginatedAdvertisements(
        Number(page),
        Number(limit)
      );
    response.error = false;
    response.data = advertisements;
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getFilteredAdvertisements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response: IResponse<IAdvertisementModel[]> = {};
    const advertisements = await advertisementService.getFilteredAdvertisements(
      req
    );
    response.error = false;
    response.data = advertisements;
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export {
  publishAdvertisement,
  getPaginatedAdvertisements,
  getFilteredAdvertisements,
};
