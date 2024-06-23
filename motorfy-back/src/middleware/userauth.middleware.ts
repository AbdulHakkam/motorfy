import { Request, Response, NextFunction } from "express";
import authConstants from "../util/constants/auth";
import { AuthError } from "../util/errors/auth.error";
import User from "../auth/user/user.model";

export const userAuthorise = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { role } = req.body.token;
  const token = req.cookies["token"];
  if (role !== authConstants.roles.USER) {
    return next(new AuthError("User do not have permission"));
  }

  const user = await User.findOne({ sessionToken: token });
  if (!user) {
    return next(new AuthError("User Session expired"));
  }
  next();
};
