"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ctrl = __importStar(require("./advertisement.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const multer_1 = __importDefault(require("multer"));
const userauth_middleware_1 = require("../middleware/userauth.middleware");
const advertisementRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "uploads/" });
advertisementRouter.post("/publish", (req, res, next) => {
    const uploads = upload.array("images");
    uploads(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            // A Multer error occurred when uploading.
        }
        else if (err) {
            // An unknown error occurred when uploading.
        }
        next();
    });
}, auth_middleware_1.auth, userauth_middleware_1.userAuthorise, ctrl.publishAdvertisement);
advertisementRouter.get("/", ctrl.getPaginatedAdvertisements);
advertisementRouter.post("/filter", upload.any(), ctrl.getFilteredAdvertisements);
exports.default = advertisementRouter;