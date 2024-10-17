import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configsService: ConfigService) => ({
        type:"postgres",
        host:configsService.get<string>('DATABASE_HOST'),
        port:configsService.get<number>('DATABASE_PORT'),
        username:configsService.get<string>('DATABASE_USERNAME'),
        password:configsService.get<string>('DATABASE_PASSWORD'),
        database:configsService.get<string>('DATABASE_NAME'),
        ssl:{
          rejectUnauthorized:false
        },
        entities:[__dirname + '/**/*.entity{.ts,.js}'], //Carrega todas as entidades do diretório
        synchronize:false
      }),
    }),
    CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
