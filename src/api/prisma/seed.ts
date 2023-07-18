import { PrismaClient } from '@prisma/client';
import { UsuarioBuilder } from '../src/core/models/impl/usuario-builder';
import { UsuarioParaBancoMapper } from '../src/core/models/impl/usuario-para-banco-mapper';
import { Nivel } from '../src/core/models/interface/nivel';
import { Qualidade } from '../src/core/models/interface/qualidade';

const prisma = new PrismaClient();

async function main() {
  await prisma.categoriaVersaoCache.create({
    data: {
      versao: 1,
    },
  });

  // ###############
  // CATEGORIAS
  // ###############

  const cat_port = await prisma.categoria.create({
    data: {
      nome: 'Português',
    },
  });

  await prisma.categoria.create({
    data: {
      nome: 'Fonética',
      categoria_pai_id: cat_port.id,
    },
  });

  await prisma.categoria.create({
    data: {
      nome: 'Fonologia',
      categoria_pai_id: cat_port.id,
    },
  });

  const cat_morf = await prisma.categoria.create({
    data: {
      nome: 'Morfologia',
      categoria_pai_id: cat_port.id,
    },
  });

  await prisma.categoria.create({
    data: {
      nome: 'Elementos Morfológicos',
      categoria_pai_id: cat_morf.id,
    },
  });

  await prisma.categoria.create({
    data: {
      nome: 'Substantivos',
      categoria_pai_id: cat_morf.id,
    },
  });

  const cat_verb = await prisma.categoria.create({
    data: {
      nome: 'Verbos',
      categoria_pai_id: cat_morf.id,
    },
  });

  await prisma.categoria.create({
    data: {
      nome: 'Sintaxe',
      categoria_pai_id: cat_port.id,
    },
  });

  const cat_geo = await prisma.categoria.create({
    data: {
      nome: 'Geografia',
    },
  });

  await prisma.categoria.create({
    data: {
      nome: 'Espaço Geográfico',
      categoria_pai_id: cat_geo.id,
    },
  });

  await prisma.categoria.create({
    data: {
      nome: 'Paisagem',
      categoria_pai_id: cat_geo.id,
    },
  });

  await prisma.categoria.create({
    data: {
      nome: 'Território',
      categoria_pai_id: cat_geo.id,
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

  const usuario = await prisma.usuario.create({
    data: UsuarioParaBancoMapper.mapear(ubuild.build()),
  });

  // ###############
  // PERMISSOES
  // ###############

  const grp1 = await prisma.grupo.create({
    data: {
      nome: 'Curso A',
    },
  });

  await prisma.grupoCategoria.create({
    data: {
      grupo_id: grp1.id,
      categoria_id: cat_port.id,
    },
  });

  await prisma.grupoUsuario.create({
    data: {
      grupo_id: grp1.id,
      usuario_id: usuario.id,
    },
  });

  // ###############
  // QUESTOES
  // ###############

  await prisma.questao.create({
    include: {
      alternativas: true,
    },
    data: {
      enunciado:
        '(1) Assinale a alternativa em que a forma verbal destacada está flexionada em conformidade com a norma-padrão.',
      nivel: Nivel.Facil,
      qualidade: Qualidade.Boa,
      alternativas: {
        createMany: {
          data: [
            {
              descricao:
                '(TESTE 1) Se as plataformas se manterem omissas em relação à violência virtual, provavelmente as agressões no mundo real aumentarão.',
              resposta: false,
            },
            {
              descricao:
                '(TESTE 1) Os ataques às escolas são uma realidade inconteste e, para evitar novas ocorrências, a autoridade pública já interviu com rigor.',
              resposta: false,
            },
            {
              descricao:
                '(TESTE 1) Se as plataformas fazerem de conta que a violência não existe no mundo virtual, dará condições de elas aumentarem ainda mais.',
              resposta: false,
            },
            {
              descricao:
                '(TESTE 1) Para enfrentar as dificuldades que sobrevierem no combate à violência, as redes sociais devem valer-se do Marco Civil da Internet.',
              resposta: true,
            },
          ],
        },
      },
      categoria_id: cat_verb.id,
      elaborador_id: usuario.id,
    },
  });

  await prisma.questao.create({
    include: {
      alternativas: true,
    },
    data: {
      enunciado:
        '(2) Assinale a alternativa em que a forma verbal destacada está flexionada em conformidade com a norma-padrão.',
      nivel: Nivel.Medio,
      qualidade: Qualidade.Boa,
      alternativas: {
        createMany: {
          data: [
            {
              descricao:
                '(TESTE 2) Se as plataformas se manterem omissas em relação à violência virtual, provavelmente as agressões no mundo real aumentarão.',
              resposta: false,
            },
            {
              descricao:
                '(TESTE 2) Os ataques às escolas são uma realidade inconteste e, para evitar novas ocorrências, a autoridade pública já interviu com rigor.',
              resposta: false,
            },
            {
              descricao:
                '(TESTE 2) Se as plataformas fazerem de conta que a violência não existe no mundo virtual, dará condições de elas aumentarem ainda mais.',
              resposta: false,
            },
            {
              descricao:
                '(TESTE 2) Para enfrentar as dificuldades que sobrevierem no combate à violência, as redes sociais devem valer-se do Marco Civil da Internet.',
              resposta: true,
            },
          ],
        },
      },
      categoria_id: cat_verb.id,
      elaborador_id: usuario.id,
    },
  });

  await prisma.questao.create({
    include: {
      alternativas: true,
    },
    data: {
      enunciado:
        '(3) Assinale a alternativa em que a forma verbal destacada está flexionada em conformidade com a norma-padrão.',
      nivel: Nivel.Dificil,
      qualidade: Qualidade.Ruim,
      alternativas: {
        createMany: {
          data: [
            {
              descricao:
                '(TESTE 3) Se as plataformas se manterem omissas em relação à violência virtual, provavelmente as agressões no mundo real aumentarão.',
              resposta: false,
            },
            {
              descricao:
                '(TESTE 3) Os ataques às escolas são uma realidade inconteste e, para evitar novas ocorrências, a autoridade pública já interviu com rigor.',
              resposta: false,
            },
            {
              descricao:
                '(TESTE 3) Se as plataformas fazerem de conta que a violência não existe no mundo virtual, dará condições de elas aumentarem ainda mais.',
              resposta: false,
            },
            {
              descricao:
                '(TESTE 3) Para enfrentar as dificuldades que sobrevierem no combate à violência, as redes sociais devem valer-se do Marco Civil da Internet.',
              resposta: true,
            },
          ],
        },
      },
      categoria_id: cat_verb.id,
      elaborador_id: usuario.id,
    },
  });

  await prisma.questao.create({
    include: {
      alternativas: true,
    },
    data: {
      enunciado:
        '(4) Assinale a alternativa em que a forma verbal destacada está flexionada em conformidade com a norma-padrão.',
      nivel: Nivel.Dificil,
      qualidade: Qualidade.Boa,
      alternativas: {
        createMany: {
          data: [
            {
              descricao:
                '(TESTE 4) Se as plataformas se manterem omissas em relação à violência virtual, provavelmente as agressões no mundo real aumentarão.',
              resposta: false,
            },
            {
              descricao:
                '(TESTE 4) Os ataques às escolas são uma realidade inconteste e, para evitar novas ocorrências, a autoridade pública já interviu com rigor.',
              resposta: false,
            },
            {
              descricao:
                '(TESTE 4) Se as plataformas fazerem de conta que a violência não existe no mundo virtual, dará condições de elas aumentarem ainda mais.',
              resposta: false,
            },
            {
              descricao:
                '(TESTE 4) Para enfrentar as dificuldades que sobrevierem no combate à violência, as redes sociais devem valer-se do Marco Civil da Internet.',
              resposta: true,
            },
          ],
        },
      },
      categoria_id: cat_verb.id,
      elaborador_id: usuario.id,
    },
  });
}

main();
