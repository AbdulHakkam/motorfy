import { Document } from "mongoose";

export interface IUserModel extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resetToken: { resetCode: string; createdAt: string };
  registerToken: { otpCode: string; createdAt: string };
  sessionToken: string;
  expiredAt: string;
  profilePicUrl: string;
}

export type IUser = Pick<
  IUserModel,
  "firstName" | "lastName" | "email" | "password" | "profilePicUrl"
>;

export type IUserResponse = Omit<IUser, "password">;
