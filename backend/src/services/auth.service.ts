import { compare } from "bcrypt";
import User from "../models/user.model";
import { LoginUserPayload } from "../types/auth.type";
import { getAccessToken } from "../utils/token.helper";

const findUserByEmail = async (email:string) => {
  try {
    return await User.findOne({ where: { email }});
  } catch(error:any) {
    return null;
  } 
}

const verifyUser = async (payload: LoginUserPayload) : Promise<{ accessToken: string }> => {
    const { email, password } = payload;
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("User does not exist");
    }
    const passwordInDB = user.password;
    const isValidUser = await compare(password, passwordInDB);
    if (!isValidUser) {
      throw new Error("Password is incorrect");
    }
    const userId = user.id;
    const accessToken = getAccessToken({ userId });
    return { accessToken };
};

export {
  verifyUser,
  findUserByEmail
}