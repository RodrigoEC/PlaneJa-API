import { Request, Response } from "express";
import {
  extractClassesOffered as extractClasses,
  extractUniqueSubjects,
} from "../services/classesOffered/extraction";
import { deleteClassesOffered, getClassesOffered } from "../services/classesOffered/db";
import { capitalize } from "../util/util";
import { extractText } from "./index";

const NOPARAMSERROR =
  "Paramêtros name (string) ou semester (string não foram enviados";

/**
 * This function extracts the text from a classes offered file that is sent
 * as part of the request object.
 *
 * @param req request object containing the request parameters
 * @param res Response object
 */
export const extractClassesOffered = async (req: Request, res: Response) => {
  extractText(req, res, extractClasses);
};

/**
 * This function is the controller function that returns a response object with
 * an object of the type Semester (src/services/classesOffered.ts) stored on the project's database. 
 * If nothing is found with the parameters that are given this object is returned:
 * 
 * {
 *  "name": "",
 *  "semester": "",
 *  "classes": []
 * }
 * 
 * @param req Request object that contains the following parameters:
    * @param name: Course's name;
    * @param semester: A specific classes offered semester
 * @param res Response object
 */
export const retrieveClassesOffered = async (req: Request, res: Response) => {
  try {
    const { name, semester } = req.query;

    const classesOffered = await getClassesOffered(
      capitalize(name as string),
      semester as string
    );

    res.status(201).send(classesOffered);
  } catch (e: any) {
    res.status(e.statusCode ?? 500).send(e.message);
  }
};

/**
 * This function is the controller function that deletes a specific classes offered data from the database.
 * For that the user has to send the course name and semester as part of the request body.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const excludeClassesOffered = async (req: Request, res: Response) => {
  try {
    const { name, semester }: { name: string; semester: string } = req.body;
    if (!name || !semester) res.status(400).send(NOPARAMSERROR);

    const status: any = await deleteClassesOffered(name.toLocaleLowerCase(), semester);

    if (status["deletedCount"] === 0)
      return res
        .status(200)
        .send(
          `Nenhum pijama do curso ${name} e do semestre ${semester} foi encontrado no banco de dados para ser deletado`
        );

    res.status(200).send(status);
  } catch (e: any) {
    res.status(e.statusCode ?? 500).send(e.message);
  }
};

/**
 * Request controller that returns an object with a list of unique subjects
 * @param req Request object
 * @param res Response object
 */
export const retrieveUniqueSubject = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    const subjects = await extractUniqueSubjects((name as string).toLocaleLowerCase());

    res.status(200).send(subjects);
  } catch (e: any) {
    res.status(e.statusCode ?? 500).send(e.message);
  }
};
