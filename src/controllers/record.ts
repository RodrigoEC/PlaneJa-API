import { Request, Response } from "express";
import { getClassesOffered } from "../services/classesOffered/db";
import { recommendSubjects } from "../services/recommend";
import { extractRegexRecord, getAvailableSubjects } from "../services/records";
import { defaultEnrollmentInfo, EnrollmentInfo, Subject } from "../util/interfaces";
import { extractPDFText } from "../util/util";

export const extractRecord = async (req: Request, res: Response) => {
  try {
    const file = req["file"];
    if (!file) return res.status(404).send("Missing file (File) parameter");
    const text = await extractPDFText(file.path);
    
    
    const { include, recommend } = req.query;

    const recommentEnrollment = recommend !== undefined;
    let requiredItems: string[] = [];
    if (include) {
      const includedItems = include.toString().split(",");
      requiredItems = includedItems.map((item) => item.trim());
      
      if (recommentEnrollment && !requiredItems.includes("course")) {
        requiredItems.push("course");
      }
    }
    
    const gradData = await extractRegexRecord(text, requiredItems);
    const availableSubs = await getAvailableSubjects(gradData.subjects || [],  gradData.course);

    const response = {
      record: gradData,
      semester_data: availableSubs,
    };

    res.status(200).send(response);
  } catch (e: any) {
    res.status(e.statusCode ?? 500).send({ error: e.message });
  }
};
