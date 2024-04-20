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

animalsRouter.post("/", async (req: Request, res: Response) => {
  try {
    console.log({ data: req.body });
    await firestoreUtils.AddDocument("animals", req.body);
    res.status(200);
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

animalsRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const animals = await firestoreUtils.UpdateDocumentById(
      "animals",
      req.params.id,
      req.body
    );
    res.status(200).json(animals);
  } catch (error) {
    res.status(404).send(error);
  }
});

animalsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const animals = await firestoreUtils.DeleteDocumentById(
      "animals",
      req.params.id
    );
    res.status(200).json(animals);
  } catch (error) {
    res.status(404).send(error);
  }
});
