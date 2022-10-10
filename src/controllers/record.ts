import { Request, Response } from "express";
import { extractText } from ".";
import { getStudentRecord } from "../services/extract/records";

export const extractRecord = async (req: Request, res: Response) => {
  extractText(req, res, getStudentRecord);
};
