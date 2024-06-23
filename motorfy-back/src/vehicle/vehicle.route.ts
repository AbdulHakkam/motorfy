import express from "express";
import * as ctrl from "./vehicle.controller";

const vehicleRouter = express.Router();

vehicleRouter.get("/options/:vehicleType", ctrl.getVehicleParams);
vehicleRouter.get("/options/:vehicleType/:make", ctrl.getVehicleModel);
vehicleRouter.post("/publish", ctrl.publishVehicle);

export default vehicleRouter;
