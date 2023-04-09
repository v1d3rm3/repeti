export interface IRecuperarQuestaoResponse {
  id: number;
  enunciado: string;
  resposta: any; // alternativa
  alternativas: any[];
  categoria: string;
}
