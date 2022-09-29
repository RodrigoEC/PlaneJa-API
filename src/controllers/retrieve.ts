import { Request, Response } from "express";
import { getClassesOffered } from "../services/db";
import { capitalize } from "../util/util";

const NOPARAMSERROR =
  "Paramêtros name (string) ou semester (string não foram enviados";

export const retrieveClassesOffered = async (req: Request, res: Response) => {
  try {
    const { name, semester }: { name: string; semester: string } = req.body;
    if (!name || !semester) res.status(400).send(NOPARAMSERROR);

    const classesOffered = await getClassesOffered(capitalize(name), semester);

    res.status(201).send(classesOffered);
  } catch (e) {
    res.status(e.statusCode ?? 500).send(e.message);
  }
};
