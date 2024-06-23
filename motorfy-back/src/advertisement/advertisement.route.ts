import express from "express";
import * as ctrl from "./advertisement.controller";
import { auth } from "../middleware/auth.middleware";
import multer from "multer";
import { userAuthorise } from "../middleware/userauth.middleware";

const advertisementRouter = express.Router();
const upload = multer({ dest: "uploads/" });
advertisementRouter.post(
  "/publish",
  (req, res, next) => {
    const uploads = upload.array("images");

    uploads(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
      } else if (err) {
        // An unknown error occurred when uploading.
      }
      next();
    });
  },
  auth,
  userAuthorise,
  ctrl.publishAdvertisement
);

advertisementRouter.get("/", ctrl.getPaginatedAdvertisements);

advertisementRouter.post(
  "/filter",
  upload.any(),
  ctrl.getFilteredAdvertisements
);

export default advertisementRouter;
