import { IQuestao } from '../../interface/questao';

export type QuestaoCriarReq = Pick<
  IQuestao,
  'nivel' | 'qualidade' | 'categoriaId' | 'enunciado'
>;
