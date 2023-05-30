import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string
}

const ACCESS_TOKEN_DURATION = "1d";

const secretKey = process.env.ACESS_TOKEN_SECRET_KEY || '';

const verifyToken = (token: string) => {
  return jwt.verify(token, secretKey);
};

const decodeToken = (token: string) => {
  return jwt.decode(token);
};

const getAccessToken = (payload: JwtPayload) => {
  return jwt.sign(payload, secretKey, { expiresIn: ACCESS_TOKEN_DURATION });
};

export {
  verifyToken,
  decodeToken,
  getAccessToken
};