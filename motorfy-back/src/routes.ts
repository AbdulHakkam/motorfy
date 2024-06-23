import { Router } from "express";
import userRouter from "./auth/user/user.route";
import vehicleRouter from "./vehicle/vehicle.route";
import advertisementRouter from "./advertisement/advertisement.route";
import areaRouter from "./area/area.route";

const allRoutes: Router = Router();

allRoutes.use("/user", userRouter);
allRoutes.use("/vehicle", vehicleRouter);
allRoutes.use("/advertisement", advertisementRouter);
allRoutes.use("/area", areaRouter);

allRoutes.get("/ping", (req, res) => res.status(200).json({ hello: "world" }));

export default allRoutes;
