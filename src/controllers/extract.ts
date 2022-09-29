import { Request, Response } from "express";
import {
  extractClassesOffered,
  Semester,
} from "../services/extract/classesOffered";
import { extractRegexRecord, GradRecord } from "../services/extract/records";
import { extractPDFText } from "../util/util";

/**
 * This is a default function to handle with text extraction requests.
 *
 * @param req Object of the type Request that has the param req.file used to extract the text
 * @param res Object of the type Response
 * @param processData Function that's going to be used to extract the data
 * from the text extracted from the PDF file
 */
const extractDefault = async (
  req: Request,
  res: Response,
  processData: (text: string) => Array<GradRecord> | Promise<Semester>
) => {
  try {
    const file = req["file"];
    if (!file) return res.status(404).send("Missing file (File) parameter");

    const text = await extractPDFText(file.path);
    const gradData = await processData(text);

    res.status(201).send(gradData);
  } catch (e) {
    res.status(e.statusCode ?? 500).send(e.message);
  }
};

export const extractRecord = async (req: Request, res: Response) => {
  extractDefault(req, res, extractRegexRecord);
};

export const extractPajama = async (req: Request, res: Response) => {
  extractDefault(req, res, extractClassesOffered);
};
