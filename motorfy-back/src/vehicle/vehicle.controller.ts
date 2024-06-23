import { NextFunction, Response, Request } from "express";
import { IResponse } from "../types/response.type";
import vehicleService from "./vehicle.service";
import { vehicleParamResponse } from "../types/response/vehicle.type";

const publishVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const response: IResponse<string> = {};
    await vehicleService.addVehicle(body);
    response.error = false;
    response.message = "Published successfully";

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getVehicleParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vehicleType = req.params.vehicleType;
    const response: IResponse<vehicleParamResponse> = {};
    const data = await vehicleService.getVehicleParams(vehicleType);
    response.error = false;
    response.message = "Success";
    response.data = data;
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getVehicleModel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vehicleType = req.params.vehicleType;
    const make = req.params.make;
    const response: IResponse<string[]> = {};
    const data = await vehicleService.getVehicleModel(vehicleType, make);
    response.error = false;
    response.message = "Success";
    response.data = data;
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export { publishVehicle, getVehicleParams, getVehicleModel };
