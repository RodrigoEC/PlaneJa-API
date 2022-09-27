export class ExtractError extends Error {
  statusCode = 422;

  constructor() {
    const message =
      "Algo de errado aconteceu: Não foi possível extrair dados do arquivo enviado";
    super(message);
    Object.setPrototypeOf(this, ExtractError.prototype);
  }
}
