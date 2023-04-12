import { IQuestao } from "../models/questao";

export interface IListarProvaResponseDto {
  id: number;
  nomeProva: string;
  questoes: IQuestao[];
}
