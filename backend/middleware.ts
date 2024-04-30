import { Request, Response, NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../src/helpers/types";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).send("No auth header");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).send("Bearer token not found");

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = user;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export const verifyCookie = (req: any, res: Response, next: NextFunction) => {
  const token = req.body.accessToken;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY as string);
      req.user = user;
    } catch (error) {
      return res.status(401).send("Invalid Token");
    }
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const verifyRole =
  (role: UserRole) => (req: any, res: Response, next: NextFunction) => {
    if (req.user.role === role) {
      return next();
    } else {
      return res.status(403).send(`Unauthorized access.`);
    }
  };
export const log = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV == "dev") {
    //console.log(`request sent from ${req.protocol} with headers: {req.header}`);
  }

  next();
};
