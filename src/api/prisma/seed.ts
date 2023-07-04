import { PrismaClient } from '@prisma/client';
import { UsuarioBuilder } from '../src/core/models/impl/usuario-builder';
import { UsuarioParaBancoMapper } from '../src/core/models/impl/usuario-para-banco-mapper';

const prisma = new PrismaClient();

async function main() {
  await prisma.categoria.create({
    data: {
      nome: 'Portugues',
    },
  });

  const cat_mat = await prisma.categoria.create({
    data: {
      nome: 'Matematica',
    },
  });

  await prisma.categoria.create({
    data: {
      nome: 'Algebra',
      categoria_pai_id: cat_mat.id,
    },
  });

  let usuario = UsuarioBuilder.create()
    .email('fulano@domain.com')
    .nome('Fulano')
    .sobrenome('De Tal');
  usuario = await usuario.senhaSemCriptografiaAsync('123456789');

  await prisma.usuario.create({
    data: UsuarioParaBancoMapper.mapear(usuario.build()),
  });
}

main();
