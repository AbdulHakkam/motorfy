"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const areaSchema = new mongoose_1.Schema({
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
}, { timestamps: true, strict: true });
const Area = (0, mongoose_1.model)("Area", areaSchema, "area");
exports.default = Area;
