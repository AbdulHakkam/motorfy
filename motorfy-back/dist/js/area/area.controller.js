"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishSubregion = exports.getAreaInfo = exports.publishArea = void 0;
const area_service_1 = __importDefault(require("./area.service"));
const publishArea = async (req, res, next) => {
    try {
        const body = req.body;
        const response = {};
        await area_service_1.default.addArea(body);
        response.error = false;
        response.message = "Published successfully";
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.publishArea = publishArea;
const getAreaInfo = async (req, res, next) => {
    try {
        const response = {};
        response.data = await area_service_1.default.getAreaInfo();
        response.message = "retrieved successfully";
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getAreaInfo = getAreaInfo;
const publishSubregion = async (req, res, next) => {
    try {
        const response = {};
        await area_service_1.default.addSubregion(req.body);
        response.message = "published successfully";
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.publishSubregion = publishSubregion;
