import { IUserModel } from "./user.type";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
    },

    lastName: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    sessionToken: {
      type: String,
    },

    resetToken: {
      resetCode: {
        type: String,
      },
      createdAt: {
        type: Date,
      },
    },

    registerToken: {
      otpCode: {
        type: String,
      },

      createdAt: {
        type: Date,
      },
    },

    profilePicUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model<IUserModel>("User", userSchema, "users");
export default User;
