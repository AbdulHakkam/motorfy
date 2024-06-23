"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const vehicle_constants_1 = require("../util/constants/vehicle.constants");
const advertisementSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.values(vehicle_constants_1.vehicleTypes),
        required: [true, "Type is required"],
    },
    make: {
        type: String,
        required: [true, "Make is required"],
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    vehicleModel: {
        type: String,
        required: [true, "Model is required"],
    },
    transmission: {
        type: String,
        enum: Object.values(vehicle_constants_1.transmissionTypes),
        required: [true, "Transmission is required"],
    },
    fuel: {
        type: String,
        enum: Object.values(vehicle_constants_1.fuelTypes),
        required: [true, "Fuel is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    mileage: {
        type: Number,
        required: [true, "Mileage is required"],
    },
    sellerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Seller is required"],
    },
    year: {
        type: Number,
        required: [true, "Year is required"],
    },
    engineCapacity: {
        type: Number,
        required: [true, "Engine capacity is required"],
    },
    images: { type: [String], required: [true, "Images are required"] },
    location: {
        type: [String],
        required: [true, "Location is required"],
    },
}, { timestamps: true, strict: true });
const Advertisement = (0, mongoose_1.model)("Advertisement", advertisementSchema, "advertisements");
exports.default = Advertisement;
