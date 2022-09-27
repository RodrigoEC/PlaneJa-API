/** REGEX */
export const regexRecord =
  /([0-9]{7})([^a-z]*)(?:.*?)(Obrigatória|Optativa|Extracurricular)(\d)(\d{2})((?:\d{1,2},\d|-))(Dispensa|Aprovado|Reprovado|Trancado)(\d{4}\.\d)/g;

export const regexPajamaContent =
  /([0-9]{7}) - ([^a-z]*)\d{2}(?:(\d{2})(\d{3})Ofertada|(\d)(\d{2})(?:(\d) (\d{2}:\d{2})-(\d{2}:\d{2}) \(.*?\))(?:(\d) (\d{2}:\d{2})-(\d{2}:\d{2}) \(.*?\)){0,1}.*?TOTAL)/g;

export const regexSemesterCourse = /\d{5} - (.*?) - DPeríodo: (\d{4}.\d)/g;
