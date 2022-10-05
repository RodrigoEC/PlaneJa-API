/** REGEX */
export const regexRecord =
  /\|([0-9]{7})((?![0-9]{7}).*?)(?:\|(.*?)\|)?(Obrigatória|Optativa|Extracurricular|Complementar)(?:(?:(\d)(\d{2})(10,0|-))|(?:(\d)(\d{2})(\d,\d|-))|(?:(\d{2})(\d{3})(10,0|-))|(?:(\d{2})(\d{3})(\d,\d|-)))(Dispensa|Aprovado|Reprovado|Trancado|Em Curso|Reprovado \|por Falta \|)(\d{4}\.\d)/g;

export const regexPajamaContent =
  /(?:(?:Professores:|\d{1,2}) (?:[0-9]{7}) - (?:(?![0-9]{7}).*?))? ([0-9]{7}) - ((?![0-9]{7}).*?)(\d{2}) (\d{1,2}) (\d{2,3}) (?:(\d) (\d{2}:\d{2})-(\d{2}:\d{2}) \(.*?\))?(?:(\d) (\d{2}:\d{2})-(\d{2}:\d{2}) \(.*?\))?(?:(\d) (\d{2}:\d{2})-(\d{2}:\d{2}) \(.*?\))?(?:(\d) (\d{2}:\d{2})-(\d{2}:\d{2}) \(.*?\))?/g;

export const regexSemesterCourse = /\d{5} - (.*?) - D Período: (\d{4}.\d)/g;

export const progressParameter = {
  "Ciência Da Computação": {
    obrigatório: 132,
    optativa: 40,
  },
};
