export const throwExtractError = (campos: string[]): never => {
  let message = "Não foi extrair do arquivo enviado o(s) campo(s):";

  campos.forEach(
    (campo, i) =>
      (message = `${message} "${campo}"${i !== campos.length - 1 ? " e" : ""}`)
  );

  throw new Error(message + ".");
};
