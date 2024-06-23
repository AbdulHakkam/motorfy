/*
middleware for authenticate request -jwt
*/

import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { AuthError } from "../util/errors/auth.error";
import isObject from "../util/common/validation";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return next(new AuthError("Please authenticate"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
    req.body.token = decoded;
    const { _id } = req.body.token;
    if (!isObject(_id)) {
      return next(new AuthError("Invalid token"));
    }
    res.header(
      "Access-Control-Allow-Origin",
      process.env.CLIENT_ORIGIN || "http://localhost:3001"
    );
    next();
  } catch (err) {
    next(new AuthError("Please authenticate"));
  }
};
