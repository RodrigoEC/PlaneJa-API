/** REGEX */
export const regexRecord =
  /\|([0-9]{7})((?![0-9]{7}).*?)(?:\|(.*?)\|)?(Obrigatória|Optativa|Extracurricular|Complementar)(?:(?:(\d)(\d{2})(10,0|-))|(?:(\d)(\d{2})(\d,\d|-))|(?:(\d{2})(\d{3})(10,0|-))|(?:(\d{2})(\d{3})(\d,\d|-)))(Dispensa|Aprovado|Reprovado|Trancado|Em Curso)(\d{4}\.\d)/g;

export const regexPajamaContent =
  /([0-9]{7}) - ([^a-z]*)\d{2}(?:(\d{2})(\d{3})Ofertada|(\d)(\d{2})(?:(\d) (\d{2}:\d{2})-(\d{2}:\d{2}) \(.*?\))(?:(\d) (\d{2}:\d{2})-(\d{2}:\d{2}) \(.*?\)){0,1}.*?TOTAL)/g;

export const regexSemesterCourse = /\d{5} - (.*?) - DPeríodo: (\d{4}.\d)/g;
