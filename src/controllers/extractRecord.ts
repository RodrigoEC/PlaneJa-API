import { Request, Response } from "express";
import { extractPDFText, regexRecord } from "../services";

export const extractRecord = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send("Missing file (File) parameter");

    const text = await extractPDFText(file.path);
    const gradData = regexRecord(text);
    if (gradData.length === 0)
      return res
        .status(400)
        .send("Wasn't possible to extract any data from the PDF uploaded");

    res.status(200).send(gradData);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
