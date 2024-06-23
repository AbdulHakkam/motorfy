"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./auth/user/user.route"));
const vehicle_route_1 = __importDefault(require("./vehicle/vehicle.route"));
const advertisement_route_1 = __importDefault(require("./advertisement/advertisement.route"));
const area_route_1 = __importDefault(require("./area/area.route"));
const allRoutes = (0, express_1.Router)();
allRoutes.use("/user", user_route_1.default);
allRoutes.use("/vehicle", vehicle_route_1.default);
allRoutes.use("/advertisement", advertisement_route_1.default);
allRoutes.use("/area", area_route_1.default);
allRoutes.get("/ping", (req, res) => res.status(200).json({ hello: "world" }));
exports.default = allRoutes;
