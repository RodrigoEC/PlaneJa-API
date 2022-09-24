import { Request, Response } from "express";
import { extractPajamaSubjects } from "../services/extractPajamas";
import { extractRegexRecord } from "../services/extractRecords";
import { PDFWRONGCONTENT } from "../util/const";
import { extractPDFText } from "../util/util";

const extractDefault = async (
  req: Request,
  res: Response,
  processData: (text: string) => Array<any>
) => {
  try {
    const file = req.file;
    if (!file) return res.status(404).send("Missing file (File) parameter");

    const text = await extractPDFText(file.path);
    const gradData = processData(text);
    if (gradData.length === 0) return res.status(422).send(PDFWRONGCONTENT);

    res.status(200).send(gradData);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const extractRecord = async (req: Request, res: Response) => {
  extractDefault(req, res, extractRegexRecord);
};

export const extractPajama = async (req: Request, res: Response) => {
  extractDefault(req, res, extractPajamaSubjects);
};
