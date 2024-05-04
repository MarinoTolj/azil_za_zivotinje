import express, { Request, Response } from "express";
import { firestoreUtils } from "../firebase/firestoreUtils";
import { IAnimal } from "../../src/helpers/types";
import { verifyCookie, verifyRole } from "../middleware";
export const animalsRouter = express.Router();
import multer from "multer";
const upload = multer();

animalsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const animals = await firestoreUtils.GetCollectionByName<IAnimal[]>(
      "animals"
    );
    res.status(200).json(animals);
  } catch (error) {
    res.status(404).send(error);
  }
});

animalsRouter.post(
  "/",
  verifyCookie("accessToken"),
  verifyRole("admin"),
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      await firestoreUtils.AddDocument("animals", req.body, req.file);
      res.sendStatus(200);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

animalsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const animals = await firestoreUtils.GetDocumentById<IAnimal>(
      "animals",
      req.params.id
    );
    res.status(200).json(animals);
  } catch (error) {
    res.status(404).send(error);
  }
});

animalsRouter.patch(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const animals = await firestoreUtils.UpdateDocumentById(
        "animals",
        req.params.id,
        req.body,
        req.file
      );
      res.status(200).json(animals);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

animalsRouter.delete(
  "/:id",
  verifyCookie("accessToken"),
  verifyRole("admin"),
  async (req: Request, res: Response) => {
    try {
      const animals = await firestoreUtils.DeleteDocumentById(
        "animals",
        req.params.id
      );
      res.status(200).json(animals);
    } catch (error) {
      res.status(404).send(error);
    }
  }
);
