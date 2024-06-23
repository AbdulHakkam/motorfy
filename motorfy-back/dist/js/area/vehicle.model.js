"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const vehicle_constants_1 = require("../util/constants/vehicle.constants");
const vehicleSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.values(vehicle_constants_1.vehicleTypes),
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
}, { timestamps: true, strict: true }).index({ make: 1, type: 1 }, { unique: true });
const Vehicle = (0, mongoose_1.model)("Vehicle", vehicleSchema, "vehicles");
exports.default = Vehicle;
