import { env } from '@kirkw/server-utils';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: env('DATABASE_HOST'),
  port: env.number('DATABASE_PORT'),
  username: env('DATABASE_USERNAME'),
  password: env('DATABASE_PASSWORD'),
  database: env('DATABASE_DATABASE'),
  autoLoadEntities: true,
  synchronize: true,
};

export default databaseConfig;
