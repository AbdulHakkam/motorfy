"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    sessionToken: {
        type: String,
    },
    resetToken: {
        resetCode: {
            type: String,
        },
        createdAt: {
            type: Date,
        },
    },
    registerToken: {
        otpCode: {
            type: String,
        },
        createdAt: {
            type: Date,
        },
    },
    profilePicUrl: {
        type: String,
    },
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", userSchema, "users");
exports.default = User;
