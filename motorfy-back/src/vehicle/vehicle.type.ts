import { Document } from "mongoose";
import { vehicleTypes } from "../util/constants/vehicle.constants";

export interface IVehicleModel extends Document {
  type: vehicleTypes;
  make: string;
  vehicleModel: Array<string>;
}

export type IVehicle = Pick<IVehicleModel, "type" | "make" | "vehicleModel">;
