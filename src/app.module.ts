import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MdmModule } from './mdm/mdm.module';
import * as dotenv from 'dotenv';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
