import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { CategoriaBuilder } from '../src/core/models/impl/categoria/categoria-builder';
import { AlternativaBuilder } from '../src/core/models/impl/questao/alternativa-builder';
import { QuestaoBuilder } from '../src/core/models/impl/questao/questao-builder';
import { UsuarioBuilder } from '../src/core/models/impl/usuario-builder';
import { UsuarioParaBancoMapper } from '../src/core/models/impl/usuario-para-banco-mapper';
import { ICategoria } from '../src/core/models/interface/categoria';
import { Nivel } from '../src/core/models/interface/nivel';
import { Qualidade } from '../src/core/models/interface/qualidade';
import { IQuestao } from '../src/core/models/interface/questao';

const NUM_QUESTOES = 120000;
const NUM_CATEGORIAS = 1500;

const prisma = new PrismaClient();

async function main() {
  console.time('seed time');
  await prisma.categoriaVersaoCache.create({
    data: {
      versao: 1,
    },
  });

  // ###############
  // USUARIO
  // ###############

  let ubuild = UsuarioBuilder.create()
    .email('fulano@domain.com')
    .nome('Fulano')
    .sobrenome('De Tal');
  ubuild = await ubuild.senhaSemCriptografiaAsync('123456789');

  await prisma.usuario.create({
    data: UsuarioParaBancoMapper.mapear(ubuild.build()),
  });

  // ###############
  // CATEGORIAS
  // ###############

  await prisma.categoria.createMany({
    data: gerarCategorias().map((e) => {
      return {
        nome: e.nome,
        categoria_pai_id: e.categoriaPaiId,
        id: e.id,
      };
    }),
  });

  // ###############
  // QUESTOES
  // ###############

  const questoes = gerarQuestoes();
  const alternativas = gerarQuestoes()
    .map((e) => {
      return e.alternativas;
    })
    .flat();

  await prisma.questao.createMany({
    data: questoes.map((e) => {
      return {
        enunciado: e.enunciado,
        nivel: e.nivel,
        qualidade: e.qualidade,
        categoria_id: e.categoriaId,
        elaborador_id: e.elaboradorId,
        id: e.id,
      };
    }),
  });

  // ###############
  // ALTERNATIVAS
  // ###############

  await prisma.alternativa.createMany({
    data: alternativas.map((e) => {
      return {
        descricao: e.descricao,
        resposta: e.resposta,
        questao_id: e.questaoId,
      };
    }),
  });

  console.timeEnd('seed time');
}

function gerarCategorias(): ICategoria[] {
  const numeroCategorias = NUM_CATEGORIAS;
  const categorias = [];
  for (let i = 0; i < numeroCategorias; i++) {
    const nome = faker.lorem.sentence({ min: 1, max: 3 });
    let paiId = faker.helpers.maybe(
      () => faker.number.int({ min: 1, max: i + 1 }),
      {
        probability: 0.4,
      },
    );
    if (i === paiId) paiId = undefined;
    const o = CategoriaBuilder.create()
      .id(i + 1)
      .nome(nome)
      .categoriaPaiId(paiId)
      .build();
    categorias.push(o);
  }
  return categorias;
}

function gerarQuestoes(): IQuestao[] {
  const numeroQuestoes = NUM_QUESTOES;
  const questoes = [];
  for (let i = 0; i < numeroQuestoes; i++) {
    const nome = faker.lorem.sentence({ min: 1, max: 3 });

    const indiceResposta = Math.floor(Math.random() * 4) + 1;

    // gerar alternativas
    const alternativas = [];
    for (let j = 0; j < 4; j++) {
      const descricao = faker.lorem.sentence({ min: 1, max: 3 });
      const resposta = j + 1 === indiceResposta;
      const o = AlternativaBuilder.create()
        .descricao(descricao)
        .resposta(resposta)
        .questaoId(i + 1)
        .build();
      alternativas.push(o);
    }

    // gerar questao
    const o = QuestaoBuilder.create()
      .id(i + 1)
      .enunciado(nome)
      .alternativas(alternativas)
      .categoriaId(faker.number.int({ min: 1, max: NUM_CATEGORIAS }))
      .elaboradorId(faker.number.int({ min: 1, max: 1 }))
      .nivel(
        faker.helpers.arrayElement([
          Nivel.MuitoFacil,
          Nivel.Facil,
          Nivel.Medio,
          Nivel.Dificil,
          Nivel.MuitoDificil,
        ]),
      )
      .qualidade(
        faker.helpers.arrayElement([
          Qualidade.MuitoRuim,
          Qualidade.MuitoBoa,
          Qualidade.Boa,
          Qualidade.Ruim,
        ]),
      )
      .build();
    questoes.push(o);
  }
  return questoes;
}

main();
