"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleModel = exports.getVehicleParams = exports.publishVehicle = void 0;
const vehicle_service_1 = __importDefault(require("./vehicle.service"));
const publishVehicle = async (req, res, next) => {
    try {
        const body = req.body;
        const response = {};
        await vehicle_service_1.default.addVehicle(body);
        response.error = false;
        response.message = "Published successfully";
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.publishVehicle = publishVehicle;
const getVehicleParams = async (req, res, next) => {
    try {
        const vehicleType = req.params.vehicleType;
        const response = {};
        const data = await vehicle_service_1.default.getVehicleParams(vehicleType);
        response.error = false;
        response.message = "Success";
        response.data = data;
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getVehicleParams = getVehicleParams;
const getVehicleModel = async (req, res, next) => {
    try {
        const vehicleType = req.params.vehicleType;
        const make = req.params.make;
        const response = {};
        const data = await vehicle_service_1.default.getVehicleModel(vehicleType, make);
        response.error = false;
        response.message = "Success";
        response.data = data;
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getVehicleModel = getVehicleModel;
