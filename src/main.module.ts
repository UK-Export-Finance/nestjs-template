import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { MdmModule } from './modules/mdm.module';
import { MsSqlDatabaseModule } from './database';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...config],
    }),
    ThrottlerModule.forRoot({
      limit: 10, // requests
      ttl: 30, // per second
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    MsSqlDatabaseModule,
    MdmModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
