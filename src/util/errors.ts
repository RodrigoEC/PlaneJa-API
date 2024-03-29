import { Response } from "express";

export const sendError = (
  res: Response,
  payload: { status: number; error: string }
) => {
  return res.status(payload.status).send(payload);
};

export class ExtractError extends Error {
  statusCode = 422;

  constructor(dataType: string) {
    const message = `Algo de errado aconteceu: Não foi possível extrair dados do arquivo enviado.\n Tipo do dado: ${dataType}`;
    super(message);
    Object.setPrototypeOf(this, ExtractError.prototype);
  }
}

export class CourseNotFound extends Error {
  statusCode = 404;

  constructor(course: string, semester: string) {
    const message = `Algo de errado aconteceu: Não foi possível encontrar o pijama do curso: ${course} - ${semester}`;
    super(message);
    Object.setPrototypeOf(this, ExtractError.prototype);
  }
}

export class CourseNotCreated extends Error {
  statusCode = 500;

  constructor(course: string) {
    const message = `Algo de errado aconteceu: Não foi possível cadastrar o pijama do curso: ${course}`;
    super(message);
    Object.setPrototypeOf(this, ExtractError.prototype);
  }
}

export class DependenciesNotCreated extends Error {
  statusCode = 500;

  constructor(course: string) {
    const message = `Algo de errado aconteceu: Não foi possível cadastrar as depedencias do curso: ${course}`;
    super(message);
    Object.setPrototypeOf(this, ExtractError.prototype);
  }
}

export class DependenciesNotFound extends Error {
  statusCode = 404;

  constructor(course: string) {
    const message = `Algo de errado aconteceu: Não foi possível encontrar as dependencias do curso: ${course}`;
    super(message);
    Object.setPrototypeOf(this, ExtractError.prototype);
  }
}
