import { PrismaClient } from '@prisma/client';

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

  await prisma.usuario.create({
    data: {
      email: 'fulano@domain.com',
      nome: 'Fulano',
      sobrenome: 'De Tal',
      senha: '123456789',
    },
  });
}

main();
