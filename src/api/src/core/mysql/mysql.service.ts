import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolConnection, createPool } from 'mysql2/promise';

@Injectable()
export class MysqlService {
  private readonly pool: Pool;

  constructor(private config: ConfigService) {
    this.pool = createPool({
      host: 'localhost',
      user: this.config.get('DB_USER'),
      password: this.config.get('DB_PASSWORD'),
      database: this.config.get('DB_NAME'),
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }

  async query<T>(sql: string, params: any[], pool?: PoolConnection) {
    const pc = pool ?? this.pool;
    const resultFromQuery = await pc.query(sql, params);
    if (resultFromQuery && resultFromQuery[0] && resultFromQuery[0][0]) {
      const [[res]] = resultFromQuery as any;
      return res as T[];
    } else {
      return [];
    }
  }

  async getConnection() {
    return this.pool.getConnection();
  }
}
