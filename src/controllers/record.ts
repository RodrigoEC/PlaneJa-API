import { Request, Response } from "express";
import { extractText } from ".";
import { extractRegexRecord } from "../services/records";

export const extractRecord = async (req: Request, res: Response) => {
  extractText(req, res, extractRegexRecord);
};
