import { Questao } from '@prisma/client';
import { IAlternativa } from './alternativa';
import { Nivel } from './nivel';
import { Qualidade } from './qualidade';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IQuestao extends Pick<Questao, 'enunciado' | 'id'> {
  nivel: Nivel;
  qualidade: Qualidade;
  elaboradorId: number;
  categoriaId: number;
  alternativas?: IAlternativa[];
}
