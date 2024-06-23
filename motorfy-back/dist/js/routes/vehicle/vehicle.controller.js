"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishVehicle = void 0;
const vehicle_service_1 = __importDefault(require("./vehicle.service"));
const publishVehicle = async (req, res, next) => {
    try {
        const body = req.body;
        const { token } = req.body;
        const response = {};
        await vehicle_service_1.default.publishVehicle(body);
        response.error = false;
        response.message = "Published successfully";
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.publishVehicle = publishVehicle;
