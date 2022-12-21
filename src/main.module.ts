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
    MdmModule,
    TypeOrmModule.forRoot({
      name: 'default', // ms_sql_master_date
      type: 'mssql',
      url: process.env.DB_URL_MASTER_DATA,
      extra: {
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      },
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'master_data',
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
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME, // new property
      password: process.env.REDIS_PASSWORD, // new property
      no_ready_check: true, // new property
    }),
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
