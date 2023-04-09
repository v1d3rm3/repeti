import { IQuestao } from '../models/questao';

export interface IListarListaDeEstudoResponseDto {
  id: number;
  nome: string;
  questoes: IQuestao[];
}
