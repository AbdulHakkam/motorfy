import { model, Schema } from "mongoose";

const areaSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      index: true,
      unique: true,
    },
    subregion: [
      {
        type: String,
        required: [true, "sub region is required"],
      },
    ],
  },
  { timestamps: true, strict: true }
);
const Area = model("Area", areaSchema, "area");
export default Area;
