import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';
import { MdmModule } from './modules/mdm.module';
import config from './config';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mssql',
      host: 'host.docker.internal',
      port: 1433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      extra: {
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      },
      autoLoadEntities: true,
      synchronize: false,
    }),
    MdmModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [...config],
    }),
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: process.env.REDIS_HOST,
    //   port: process.env.REDIS_PORT,
    //   username: process.env.REDIS_USERNAME, // new property
    //   password: process.env.REDIS_PASSWORD, // new property
    //   no_ready_check: true, // new property
    // }),
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
