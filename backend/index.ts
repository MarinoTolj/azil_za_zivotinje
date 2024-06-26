import express, { Express, NextFunction, Response } from "express";
import { animalsRouter } from "./routers/animals";
import { donationsRouter } from "./routers/donations";
import { notificationsRouter } from "./routers/notifications";
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
  origin:
    process.env.NODE_ENV === "production"
      ? "https://azil-za-zivotinje.vercel.app"
      : "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions));

app.use(log);
app.use("/animals", animalsRouter);
app.use("/donations", donationsRouter);
app.use("/notifications", notificationsRouter);

app.post("/login", async (req, res, next) => {
  try {
    const user = await firestoreUtils.GetDocumentById("users", req.body.email);
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign(
        { userId: user.username, role: user.role },
        process.env.SECRET_KEY as string,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: true,
        sameSite: "none",
        partitioned: true,
      });
      res.sendStatus(200);
    } else {
      next(new Error("Invalid data"));
    }
  } catch (error: any) {
    next(error);
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("accessToken", {
    partitioned: true,
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
    sameSite: "none",
  });
  res.sendStatus(200);
});

const saltRounds = 10;
app.post("/registration", async (req, res, next) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    const data = { ...req.body, password: hashPass };
    await firestoreUtils.AddDocument("users", data);
    res.sendStatus(200);
  } catch (error: any) {
    next(error);
  }
});

app.post("/is_admin", (req: any, res: Response) => {
  if (req.cookies && req.cookies["accessToken"]) {
    try {
      const user = jwt.verify(
        req.cookies["accessToken"],
        process.env.SECRET_KEY as string
      ) as any;
      res.send(user.role === "admin");
    } catch (error) {
      res.send(false);
    }
  } else {
    res.send(false);
  }
});
//@ts-ignore
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
