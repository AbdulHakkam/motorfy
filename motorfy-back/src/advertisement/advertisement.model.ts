import { model, Schema } from "mongoose";
import {
  fuelTypes,
  transmissionTypes,
  vehicleTypes,
} from "../util/constants/vehicle.constants";

const advertisementSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(vehicleTypes),
      required: [true, "Type is required"],
    },
    make: {
      type: String,
      required: [true, "Make is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    vehicleModel: {
      type: String,
      required: [true, "Model is required"],
    },
    transmission: {
      type: String,
      enum: Object.values(transmissionTypes),
      required: [true, "Transmission is required"],
    },
    fuel: {
      type: String,
      enum: Object.values(fuelTypes),
      required: [true, "Fuel is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    mileage: {
      type: Number,
      required: [true, "Mileage is required"],
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
    engineCapacity: {
      type: Number,
      required: [true, "Engine capacity is required"],
    },
    images: { type: [String], required: [true, "Images are required"] },
    location: {
      type: [String],
      required: [true, "Location is required"],
    },
  },
  { timestamps: true, strict: true }
);
const Advertisement = model(
  "Advertisement",
  advertisementSchema,
  "advertisements"
);
export default Advertisement;
