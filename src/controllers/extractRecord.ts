import { Request, Response } from "express";
import { extractRegexRecord } from "../services/record";
import { extractPDFText } from "../util/util";

const PDFWRONGCONTENT = "No data required was extracted from the PDF uploaded";

export const extractRecord = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(404).send("Missing file (File) parameter");

    const text = await extractPDFText(file.path);
    const gradData = extractRegexRecord(text);
    if (gradData.length === 0) return res.status(422).send(PDFWRONGCONTENT);

    res.status(200).send(gradData);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
