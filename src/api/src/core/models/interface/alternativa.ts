import { Alternativa } from '@prisma/client';
import { IQuestao } from './questao';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAlternativa
  extends Pick<Alternativa, 'id' | 'descricao' | 'resposta'> {
  questaoId: number;
  questao?: IQuestao;
}
