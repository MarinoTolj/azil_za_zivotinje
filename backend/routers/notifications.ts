import express, { Request, Response } from "express";
import { firestoreUtils } from "../firebase/firestoreUtils";
import { verifyCookie, verifyRole } from "../middleware";
export const notificationsRouter = express.Router();

notificationsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const notifications = await firestoreUtils.GetCollectionByName(
      "notifications"
    );
    res.status(200).json(notifications);
  } catch (error) {
    res.status(404).send(error);
  }
});
notificationsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const notifications = await firestoreUtils.AddDocument(
      "notifications",
      req.body
    );
    res.status(200).json(notifications);
  } catch (error) {
    res.status(404).send(error);
  }
});
notificationsRouter.delete(
  "/:id",
  verifyCookie("accessToken"),
  verifyRole("admin"),
  async (req: Request, res: Response) => {
    try {
      await firestoreUtils.DeleteDocumentById("notifications", req.params.id);
      res.sendStatus(200);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);
