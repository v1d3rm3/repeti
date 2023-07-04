import { Prisma } from '@prisma/client';

export interface DaoParamsWrapper<T> {
  data: T;
  tx?: Prisma.TransactionClient;
}
