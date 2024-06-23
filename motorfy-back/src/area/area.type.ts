import { Document } from "mongoose";

export interface IAreaModel extends Document {
  name: string;
  subregion: Array<string>;
}

export type IArea = IAreaModel;
