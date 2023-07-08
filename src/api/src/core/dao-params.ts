import { Prisma } from '@prisma/client';
import { PoolConnection } from 'mysql2/promise';

export interface DaoParamsWrapper<T> {
  data: T;
  tx?: Prisma.TransactionClient | PoolConnection;
}
