import express, { Express, Response } from "express";
import { animalsRouter } from "./animals";
import { donationsRouter } from "./donations";
import { notificationsRouter } from "./notifications";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import { firestoreUtils } from "./firebase/firestoreUtils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { log } from "./middleware";

const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions: CorsOptions = {
  origin: "http://127.0.0.1:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/animals", animalsRouter);
app.use("/donations", donationsRouter);
app.use("/notifications", notificationsRouter);
app.use(log);

export const cookieName = "accessToken";
export const currCookie =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzOTcxMDM2LCJleHAiOjE3MTM5ODE4MzZ9.uG9BdF5ZtgczVLYe2RdIMgC5jeD2xkTnFzSJ29MMeqs";
app.post("/login", async (req, res) => {
  try {
    const user = await firestoreUtils.GetDocumentById("users", req.body.email);
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign(
        { userId: user.username, role: user.role },
        //TODO: dont forget to update vercel settings to include .env variables.
        //TODO: and also get new app key from firebase
        process.env.SECRET_KEY as string,
        {
          expiresIn: "3h", //TODO
        }
      );
      res.cookie(cookieName, token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: process.env.NODE_ENV === "dev" ? false : true,
      });
      res.status(200).send(token);
    } else {
      res.status(401).send("Invalid data");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

const saltRounds = 10;
app.post("/registration", async (req, res) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    const data = { ...req.body, password: hashPass };
    await firestoreUtils.AddDocument("users", data);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.post("/is_admin", (req: any, res: Response) => {
  req.cookies[cookieName] = currCookie;
  if (req.cookies && req.cookies[cookieName]) {
    try {
      const user = jwt.verify(
        req.cookies[cookieName],
        process.env.SECRET_KEY as string
      ) as any;
      res.send(user.role === "admin" ? true : false);
    } catch (error) {
      res.send(false);
    }
  } else {
    res.send(false);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
