import express, { Request, Response } from "express";
import { firestoreUtils } from "./firebase/firestoreUtils";
import { IAnimal } from "../src/helpers/types";
export const animalsRouter = express.Router();

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
