import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { UserRole } from "../src/helpers/types";

export const verifyCookie =
  (cookieName: string) => (req: any, res: Response, next: NextFunction) => {
    if (req.cookies && req.cookies[cookieName]) {
      try {
        const user = jwt.verify(
          req.cookies[cookieName],
          process.env.SECRET_KEY as string
        );
        req.user = user;
      } catch (error) {
        next(new Error("Invalid Token"));
      }
      next();
    } else {
      next(new Error("Unauthorized"));
    }
  };

export const verifyRole =
  (role: UserRole) => (req: any, res: Response, next: NextFunction) => {
    if (req.user.role === role) {
      return next();
    } else {
      next(new Error("Unauthorized access."));
    }
  };
export const log = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== "production") {
    const time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, time);
  }
  next();
};
