import express from "express";
import * as ctrl from "./area.controller";

const areaRouter = express.Router();

areaRouter.post("/", ctrl.publishArea);
areaRouter.get("/", ctrl.getAreaInfo);
areaRouter.post("/subregion", ctrl.publishSubregion);

export default areaRouter;
