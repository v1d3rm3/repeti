import { IQuestao } from "./questao";

export interface IProva {
  id: number;
  nome: string;
  questoes: IQuestao[];
}
