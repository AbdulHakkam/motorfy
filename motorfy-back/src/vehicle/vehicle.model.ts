import { model, Schema } from "mongoose";
import { vehicleTypes } from "../util/constants/vehicle.constants";

const vehicleSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(vehicleTypes),
      required: [true, "Type is required"],
      index: true,
    },
    make: {
      type: String,
      required: [true, "Make is required"],
      index: true,
    },
    vehicleModel: [
      {
        type: String,
        required: [true, "Model is required"],
      },
    ],
  },
  { timestamps: true, strict: true }
).index({ make: 1, type: 1 }, { unique: true });
const Vehicle = model("Vehicle", vehicleSchema, "vehicles");
export default Vehicle;
