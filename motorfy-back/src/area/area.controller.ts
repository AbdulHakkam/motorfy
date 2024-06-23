import { NextFunction, Response, Request } from "express";
import { IResponse } from "../types/response.type";
import areaService from "./area.service";
import { IArea } from "./area.type";

const publishArea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const response: IResponse<string> = {};
    await areaService.addArea(body);
    response.error = false;
    response.message = "Published successfully";

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getAreaInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: IResponse<Array<IArea>> = {};
    response.data = await areaService.getAreaInfo();
    response.message = "retrieved successfully";

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const publishSubregion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response: IResponse<string> = {};
    await areaService.addSubregion(req.body);
    response.message = "published successfully";
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export { publishArea, getAreaInfo, publishSubregion };
