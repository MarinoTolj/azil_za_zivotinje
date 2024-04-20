import express, { Express } from "express";
import { animalsRouter } from "./animals";
import { donationsRouter } from "./donations";
import { notificationsRouter } from "./notifications";
import cors from "cors";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/animals", animalsRouter);
app.use("/donations", donationsRouter);
app.use("/notifications", notificationsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
