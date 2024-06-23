import mongoose, { Document } from "mongoose";
import {
  fuelTypes,
  transmissionTypes,
  vehicleTypes,
} from "../util/constants/vehicle.constants";

export type IAdvertisementFilter = {
  type?: vehicleTypes;
  make?: string;
  text?: string;
  vehicleModel?: string;
  transmission?: transmissionTypes;
  fuel?: fuelTypes;
  priceFrom?: number;
  priceTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
  yearFrom?: number;
  yearTo?: number;
  engineCapacityFrom?: number;
  engineCapacityTo?: number;
  location?: string[];
  sort?: string;
  order?: "-1" | "1";
};

export interface IAdvertisementModel extends Document {
  type: vehicleTypes;
  make: string;
  description: string;
  vehicleModel: string;
  transmission: transmissionTypes;
  fuel: fuelTypes;
  price: number;
  mileage: number;
  sellerId: string;
  year: number;
  engineCapacity: number;
  images: string[];
  title?: string;
  _id?: mongoose.Types.ObjectId;
}
