export enum Nivel {
  MuitoFacil = 'MuitoFacil',
  Facil = 'Facil',
  Medio = 'Medio',
  Dificil = 'Dificil',
  MuitoDificil = 'MuitoDificil',
}

export const NivelOrdem = new Map<Nivel, number>([
  [Nivel.MuitoFacil, 1],
  [Nivel.Facil, 2],
  [Nivel.Medio, 3],
  [Nivel.Dificil, 4],
  [Nivel.MuitoDificil, 5],
]);

export const OrdemNivel = new Map<number, Nivel>([
  [1, Nivel.MuitoFacil],
  [2, Nivel.Facil],
  [3, Nivel.Medio],
  [4, Nivel.Dificil],
  [5, Nivel.MuitoDificil],
]);
