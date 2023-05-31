import { Request,Response,NextFunction } from "express";
import { decodeToken, JwtPayload, verifyToken } from "../utils/token.helper";

const validateRequest = (req:Request, res:Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1] || '';
    if(!token) {
      throw new Error("Auth token is missing")
    }
    const decoded = decodeToken(token) as JwtPayload;
    const userId = decoded?.userId;

    if(!userId) {
      return res.status(400).json({ error: "Invaild token" });
    }
    verifyToken(token);
    res.locals.userId = userId;
    next();
  } catch(error:any) {
    const message = error?.message || "Unauthorized";
    return res.status(401).json({error: message});
  }
}

export {validateRequest};