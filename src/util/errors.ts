export class ExtractError extends Error {
  statusCode = 422;

  constructor() {
    const message =
      "Algo de errado aconteceu: Não foi possível extrair dados do arquivo enviado";
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
