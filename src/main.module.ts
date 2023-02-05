import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MdmModule } from './modules/mdm.module';
import { MsSqlDatabaseModule } from './database';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...config],
    }),
    MsSqlDatabaseModule,
    MdmModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
