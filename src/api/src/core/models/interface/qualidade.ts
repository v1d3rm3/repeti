export enum Qualidade {
  MuitoRuim = 'MuitoRuim',
  Ruim = 'Ruim',
  Boa = 'Boa',
  MuitoBoa = 'MuitoBoa',
}

export const QualidadeOrdem = new Map<Qualidade, number>([
  [Qualidade.MuitoRuim, 1],
  [Qualidade.Ruim, 2],
  [Qualidade.Boa, 3],
  [Qualidade.MuitoBoa, 4],
]);

export const OrdemQualidade = new Map<number, Qualidade>([
  [1, Qualidade.MuitoRuim],
  [2, Qualidade.Ruim],
  [3, Qualidade.Boa],
  [4, Qualidade.MuitoBoa],
]);
