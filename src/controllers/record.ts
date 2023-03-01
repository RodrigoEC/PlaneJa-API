import { Request, Response } from "express";
import { extractRegexRecord } from "../services/records";
import { extractPDFText } from "../util/util";

export const extractRecord = async (req: Request, res: Response) => {
  try {
    const file = req["file"];
    if (!file) return res.status(404).send("Missing file (File) parameter");
    const text = await extractPDFText(file.path);

    const { include, recommend } = req.query;

    let requiredItems: string[] = [];
    if (include) {
      const includedItems = (include as string).split(",");
      requiredItems = includedItems.map((item) => item.trim());
    }

    let recommendSubjects = false;
    if (recommend && (recommend as string).toLowerCase() === "true") {
      recommendSubjects = true;
    }

    const gradData = await extractRegexRecord(
      text,
      requiredItems,
      recommendSubjects
    );

    res.status(201).send(gradData);
  } catch (e: any) {
    res.status(e.statusCode ?? 500).send({ error: e.message });
  }
};
