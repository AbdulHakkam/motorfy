"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_error_1 = require("../util/errors/general.error");
const vehicle_model_1 = __importDefault(require("./vehicle.model"));
const publishVehicle = async (data) => {
    try {
        const vehicle = await new vehicle_model_1.default(data).save();
    }
    catch (error) {
        throw new general_error_1.GeneralError("Invalid parameter", 400);
    }
    return true;
};
exports.default = {
    publishVehicle,
};
