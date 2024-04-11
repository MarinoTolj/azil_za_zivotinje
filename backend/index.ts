import express, { Express, Request, Response } from "express";


const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.get("/test", (req: Request, res: Response) => {
  res.send("Test");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});