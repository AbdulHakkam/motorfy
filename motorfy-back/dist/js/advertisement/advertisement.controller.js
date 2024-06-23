"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredAdvertisements = exports.getPaginatedAdvertisements = exports.publishAdvertisement = void 0;
const advertisement_service_1 = __importDefault(require("./advertisement.service"));
const mongoose_1 = __importDefault(require("mongoose"));
const publishAdvertisement = async (req, res, next) => {
    try {
        console.log("publishing advertisement");
        const body = req.body;
        const response = {};
        const files = req.files;
        const { _id } = body.token;
        req.body.sellerId = new mongoose_1.default.Types.ObjectId(_id);
        await advertisement_service_1.default.publishAdvertisement(body, files);
        response.error = false;
        response.message = "Published successfully";
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.publishAdvertisement = publishAdvertisement;
const getPaginatedAdvertisements = async (req, res, next) => {
    try {
        const response = {};
        const { page, limit } = req.query;
        const advertisements = await advertisement_service_1.default.getPaginatedAdvertisements(Number(page), Number(limit));
        response.error = false;
        response.data = advertisements;
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getPaginatedAdvertisements = getPaginatedAdvertisements;
const getFilteredAdvertisements = async (req, res, next) => {
    try {
        const response = {};
        const advertisements = await advertisement_service_1.default.getFilteredAdvertisements(req);
        response.error = false;
        response.data = advertisements;
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getFilteredAdvertisements = getFilteredAdvertisements;
