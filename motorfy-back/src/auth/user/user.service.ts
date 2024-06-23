import { GeneralError } from "../../util/errors/general.error";
import User from "./user.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { IUser } from "./user.type";
import jwt, { Secret } from "jsonwebtoken";
import { ILoginResponse } from "../../types/auth.type";

/**
 * Method to register user
 * @param {IUser} data Data of the user
 * @returns {boolean}
 */
const registerUser = async (data: IUser) => {
  const user = await User.findOne({ email: data.email });

  if (user) {
    //check otp already sent
    if (user) throw new GeneralError("User already exists", 500);
  }

  const hashPassword = await bcrypt.hash(
    data.password,
    Number(process.env.BCRYPT_SALT)
  );

  //create register token
  const registerToken = crypto.randomInt(100000, 999999).toString();
  const hash = await bcrypt.hash(
    registerToken,
    Number(process.env.BCRYPT_SALT)
  );

  const newUser: IUser = await new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashPassword,
  }).save();

  if (!newUser) throw new GeneralError("Failed to save user data", 500);

  return true;
};

/**
 * Method to login user
 * @param {string} email
 * @param {string} password
 * @returns {ILoginResponse}
 */
const loginUser = async (email: string, password: string) => {
  let returnData: ILoginResponse;

  //check user exist
  const userData = await User.findOne({ email: email });
  console.log(userData);
  if (userData) {
    //check password
    const isCorrect = await bcrypt.compare(password, userData.password);
    if (isCorrect) {
      const _id = userData._id.toString();
      const role = "user";
      const token = jwt.sign({ _id, role }, process.env.JWT_SECRET as Secret, {
        expiresIn: "2 days",
      });

      // Update the token in the DB
      const updatedUser = await User.findByIdAndUpdate(userData._id, {
        sessionToken: token,
      });

      if (!updatedUser) {
        throw new GeneralError("Something went wrong", 500);
      }

      returnData = {
        _id: userData?._id,
        firstName: userData.firstName,
        email: userData?.email,
        token: token,
      };
    } else {
      throw new GeneralError("Invalid Username or Password", 401);
    }
  } else {
    throw new GeneralError("Invalid Username or Password", 401);
  }

  return returnData;
};

/**
 * Method to logout the user
 * @param {string} id
 */
const logoutUser = async (id: string) => {
  const data = await User.updateOne(
    { _id: id },
    { $unset: { sessionToken: "" } }
  );
  if (data.modifiedCount !== 1) {
    throw new GeneralError("Something went wrong while logging out", 500);
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
};
