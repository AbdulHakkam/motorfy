import { vehicleParamResponse } from "../types/response/vehicle.type";
import {
  fuelTypes,
  transmissionTypes,
} from "../util/constants/vehicle.constants";
import { GeneralError } from "../util/errors/general.error";
import Vehicle from "./vehicle.model";
import { IVehicle } from "./vehicle.type";

const getVehicleParams = async (vehicleType: string) => {
  const response: vehicleParamResponse = {
    fuelType: Object.values(fuelTypes),
    transmissionType: Object.values(transmissionTypes),
    vehicleMakes: [],
  };
  const queryRes: Array<any> = await Vehicle.find({
    type: vehicleType,
  }).distinct("make");
  if (!queryRes || queryRes.length === 0) {
    throw new GeneralError("Invalid vehicle type", 400);
  }
  const vehicleMakes = queryRes as string[];
  response.vehicleMakes = vehicleMakes;
  return response;
};

const getVehicleModel = async (vehicleType: string, make: string) => {
  const response: string[] = [];
  const queryRes: Array<IVehicle> = await Vehicle.find({
    type: vehicleType,
    make: make,
  });
  if (!queryRes || queryRes.length === 0) {
    throw new GeneralError("Invalid vehicle make", 400);
  }
  const vehicleModels = queryRes[0].vehicleModel;
  response.push(...vehicleModels);
  return response;
};

const addVehicle = async (data: IVehicle) => {
  try {
    await new Vehicle(data).save();
  } catch (error) {
    throw new GeneralError("Invalid parameter", 400);
  }

  return true;
};

export default {
  addVehicle,
  getVehicleParams,
  getVehicleModel,
};
