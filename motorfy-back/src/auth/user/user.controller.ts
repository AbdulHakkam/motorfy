import { Response, Request, NextFunction } from "express";
import { IResponse } from "../../types/response.type";
import userService from "./user.service";
import { ILoginResponse } from "../../types/auth.type";
import { IUserResponse } from "./user.type";
import { encrypt } from "../../util/common/auth";

/**
 * Control register user
 */
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const response: IResponse<string> = {};

    //store user
    await userService.registerUser(body);

    response.error = false;
    response.message = "Registered successfully";

    res.status(200).json(response);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    await userService.logoutUser(token._id);
    const response: IResponse<IUserResponse | null> = {};
    response.error = false;
    response.message = "User logged out successfully";
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Control user login
 */
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const response: IResponse<ILoginResponse> = {};

    const userData: ILoginResponse = await userService.loginUser(
      body.email,
      body.password
    );

    response.error = false;
    response.message = "Successfully Logged in";
    response.data = userData;
    res.cookie("token", userData.token, {
      httpOnly: true,
      secure: false,
    });
    res.header(
      "Access-Control-Allow-Origin",
      process.env.CLIENT_ORIGIN || "http://localhost:3001"
    );
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, logout };
