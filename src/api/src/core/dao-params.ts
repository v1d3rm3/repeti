import { PrismaClient } from '@prisma/client';

export interface DaoParamsWrapper<T> {
  data: T;
  tx?: PrismaClient;
}
