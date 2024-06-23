"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_error_1 = require("../util/errors/general.error");
const area_model_1 = __importDefault(require("./area.model"));
const addArea = async (data) => {
    try {
        await new area_model_1.default(data).save();
    }
    catch (error) {
        throw new general_error_1.GeneralError("Failed to publish", 400);
    }
    return true;
};
const addSubregion = async (data) => {
    try {
        await area_model_1.default.findOneAndUpdate({ name: data.name }, { $addToSet: { ["subregion"]: { $each: data.subregion } } }, { returnOriginal: false });
    }
    catch (error) {
        throw new general_error_1.GeneralError("Failed to patch areas", 400);
    }
};
const getAreaInfo = async () => {
    try {
        const areas = await area_model_1.default.find({}, { _id: 0, __v: 0 });
        return areas;
    }
    catch (error) {
        throw new general_error_1.GeneralError("Unable to fetch Areas", 400);
    }
};
exports.default = {
    addArea,
    getAreaInfo,
    addSubregion,
};
