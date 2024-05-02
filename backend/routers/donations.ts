import express, { Request, Response } from "express";
import { firestoreUtils } from "../firebase/firestoreUtils";
import { verifyCookie, verifyRole } from "../middleware";
export const donationsRouter = express.Router();

donationsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const donations = await firestoreUtils.GetCollectionByName("donations");
    res.status(200).json(donations);
  } catch (error) {
    res.status(404).send(error);
  }
});
donationsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const donations = await firestoreUtils.AddDocument("donations", req.body);
    res.status(200).json(donations);
  } catch (error) {
    res.status(404).send(error);
  }
});
donationsRouter.delete(
  "/:id",
  verifyCookie("accessToken"),
  verifyRole("admin"),
  async (req: Request, res: Response) => {
    try {
      await firestoreUtils.DeleteDocumentById("donations", req.params.id);
      res.sendStatus(200);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

donationsRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    await firestoreUtils.UpdateDocumentById(
      "donations",
      req.params.id,
      req.body
    );
  } catch (error) {
    res.status(404).send(error);
  }
});
