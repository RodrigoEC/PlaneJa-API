import { Request, Response } from "express";
import { sendError } from "../util/errors";
import { getDependencies, insertDependencies, updateDependencies } from "../services/dependencies";
import { Dependencies } from "../util/interfaces";

/**
 * Insert a new Semester object to the database
 *
 * @param classesOffered (Semester) new Semester object
 */
export const createDependencies = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name)
      return sendError(res, {
        status: 400,
        error: "Parâmetros obrigatórios: 'name' (string).",
      });

    const dependencies = await insertDependencies(req.body as Dependencies);

    res.status(201).send(dependencies);
  } catch (e: any) {
    sendError(res, { status: e.statusCode ?? 500, error: e.message });
  }
};

/**
 * Insert a new Semester object to the database
 *
 * @param classesOffered (Semester) new Semester object
 */
export const changeDependencies = async (req: Request, res: Response) => {
    try {
      const { name, replace } = req.body;
  
      if (!name)
        return sendError(res, {
          status: 400,
          error: "Parâmetros obrigatórios: 'name' (string).",
        });
  
      const dependencies = await updateDependencies(req.body as Dependencies, replace);
  
      res.status(200).send(dependencies);
    } catch (e: any) {
      sendError(res, { status: e.statusCode ?? 500, error: e.message });
    }
  };


  /**
 * Retrieve a Dependency object to the database
 *
 * @param course (string) course's name object
 */
export const retrieveDependencies = async (req: Request, res: Response) => {
    try {
      const { name } = req.query;
  
      if (!name)
        return sendError(res, {
          status: 400,
          error: "Parâmetros obrigatórios: 'name' (string).",
        });
  
      const dependencies = await getDependencies(name as string);
  
      res.status(200).send(dependencies);
    } catch (e: any) {
      sendError(res, { status: e.statusCode ?? 500, error: e.message });
    }
  };
