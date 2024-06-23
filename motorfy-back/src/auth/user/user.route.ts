import { Router } from "express";
import validatorMiddleware from "../../middleware/validator.middleware";
import registerSchema from "../../util/validation/register.validation";
import * as ctrl from "./user.controller";
import { userAuthorise } from "../../middleware/userauth.middleware";
import loginSchema from "../../util/validation/login.validation";
import { auth } from "../../middleware/auth.middleware";

const userRouter: Router = Router();

userRouter.post(
  "/register",
  validatorMiddleware(registerSchema),
  ctrl.registerUser
);

userRouter.post("/login", validatorMiddleware(loginSchema), ctrl.loginUser);

userRouter.post("/logout", auth, userAuthorise, ctrl.logout);
export default userRouter;
