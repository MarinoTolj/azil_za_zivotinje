import express, { Request, Response } from "express";
import { firestoreUtils } from "../firebase/firestoreUtils";
import { verifyCookie, verifyRole } from "../middleware";
export const notificationsRouter = express.Router();

notificationsRouter.get("/", async (req: Request, res: Response, next) => {
  try {
    const notifications = await firestoreUtils.GetCollectionByName(
      "notifications"
    );
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
});
notificationsRouter.post("/", async (req: Request, res: Response, next) => {
  try {
    const notifications = await firestoreUtils.AddDocument(
      "notifications",
      req.body
    );
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
});
notificationsRouter.delete(
  "/:id",
  verifyCookie("accessToken"),
  verifyRole("admin"),
  async (req: Request, res: Response, next) => {
    try {
      await firestoreUtils.DeleteDocumentById("notifications", req.params.id);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);
