import { GeneralError } from "../util/errors/general.error";
import Area from "./area.model";
import { IArea } from "./area.type";

const addArea = async (data: IArea) => {
  try {
    await new Area(data).save();
  } catch (error) {
    throw new GeneralError("Failed to publish", 400);
  }

  return true;
};

const addSubregion = async (data: IArea) => {
  try {
    await Area.findOneAndUpdate(
      { name: data.name },
      { $addToSet: { ["subregion"]: { $each: data.subregion } } },
      { returnOriginal: false }
    );
  } catch (error) {
    throw new GeneralError("Failed to patch areas", 400);
  }
};

const getAreaInfo = async () => {
  try {
    const areas: Array<IArea> = await Area.find({}, { _id: 0, __v: 0 });
    return areas;
  } catch (error) {
    throw new GeneralError("Unable to fetch Areas", 400);
  }
};

export default {
  addArea,
  getAreaInfo,
  addSubregion,
};
