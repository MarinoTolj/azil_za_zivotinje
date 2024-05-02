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
