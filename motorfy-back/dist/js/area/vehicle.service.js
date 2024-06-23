"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle_constants_1 = require("../util/constants/vehicle.constants");
const general_error_1 = require("../util/errors/general.error");
const vehicle_model_1 = __importDefault(require("./vehicle.model"));
const getVehicleParams = async (vehicleType) => {
    const response = {
        fuelType: Object.values(vehicle_constants_1.fuelTypes),
        transmissionType: Object.values(vehicle_constants_1.transmissionTypes),
        vehicleMakes: [],
    };
    const queryRes = await vehicle_model_1.default.find({
        type: vehicleType,
    }).distinct("make");
    if (!queryRes || queryRes.length === 0) {
        throw new general_error_1.GeneralError("Invalid vehicle type", 400);
    }
    const vehicleMakes = queryRes;
    response.vehicleMakes = vehicleMakes;
    return response;
};
const getVehicleModel = async (vehicleType, make) => {
    const response = [];
    const queryRes = await vehicle_model_1.default.find({
        type: vehicleType,
        make: make,
    });
    if (!queryRes || queryRes.length === 0) {
        throw new general_error_1.GeneralError("Invalid vehicle make", 400);
    }
    const vehicleModels = queryRes[0].vehicleModel;
    response.push(...vehicleModels);
    return response;
};
const addVehicle = async (data) => {
    try {
        await new vehicle_model_1.default(data).save();
    }
    catch (error) {
        throw new general_error_1.GeneralError("Invalid parameter", 400);
    }
    return true;
};
exports.default = {
    addVehicle,
    getVehicleParams,
    getVehicleModel,
};
