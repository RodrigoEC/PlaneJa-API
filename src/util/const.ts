/** REGEX */
export const regexRecord =
  /\|([0-9]{7})((?![0-9]{7}).*?)(?:\|(.*?)\|)?(Obrigatória|Optativa|Extracurricular|Complementar)(?:(?:(\d)(\d{2})(10,0|-))|(?:(\d)(\d{2})(\d,\d|-))|(?:(\d{2})(\d{3})(10,0|-))|(?:(\d{2})(\d{3})(\d,\d|-)))(Dispensa|Aprovado|Reprovado|Trancado|Em Curso|Reprovado \|por Falta \|)(\d{4}\.\d)/g;

export const regexHeadCourseData = /\d{5} - (.*?) - D Período: (\d{4}.\d)/g;

export const regexClassesOffered =
  /(?:(?:Professores:|\d{1,2}) (?:[0-9]{7}) - (?:(?![0-9]{7}).*?))? ([0-9]{7}) - ((?![0-9]{7}).*?)(\d{2}) (\d{1,2}) (\d{2,3}) (?:(\d) (\d{2}:\d{2})-(\d{2}:\d{2}) \(.*?\))?(?:(\d) (\d{2}:\d{2})-(\d{2}:\d{2}) \(.*?\))?(?:(\d) (\d{2}:\d{2})-(\d{2}:\d{2}) \(.*?\))?(?:(\d) (\d{2}:\d{2})-(\d{2}:\d{2}) \(.*?\))?/g;

export const regexStudentStatus =
  /.(?:Obrigatórias|Optativas|Atividades complementares)(?:.*?\(.*?\))(.*?)\((.*?)%\)/g;

export const regexStudentData = /Aluno: (.*?) (.*?)CPF:.*Curso: (.*?) -/g;
