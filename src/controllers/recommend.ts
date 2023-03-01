import { Request, Response } from "express";
import { recommendSubjects } from "../services/recommend";

export const recommendEnrollment = async (req: Request, res: Response) => {
  try {
    const { student_subjects, required_subjects } = req.body;

    if (!student_subjects) {
      return res.status(400).send({
        error:
          "Não foram enviados informações referentes às disciplinas cursadas pelo estudante",
      });
    }

    if (!required_subjects) {
      return res.status(400).send({
        error:
          "Não foram enviados informações referentes às disciplinas obrigatorias à matrícula",
      });
    }

    const recommendedSubjects = await recommendSubjects(
      student_subjects,
      required_subjects
    );
    res.status(201).send(recommendedSubjects);
  } catch (e: any) {
    res.status(e.statusCode ?? 500).send({ error: e.message });
  }
};
