import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartModule } from './api/cart/cart.module';
import { ProductModule } from './api/product/product.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConnectionString } from 'connection-string';

require('dotenv').config()

const DB = new ConnectionString(process.env.DATABASE_URL); 

@Module({ 
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    CacheModule.register({
      isGlobal: true,
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: DB.host,
        port: DB.port,
        username: DB.user,
        password: DB.password,
        database: process.env.DB_NAME || 'main',
        autoLoadModels: true,
        synchronize: true
      }),
      inject: [ConfigService],
    }),

    GraphQLModule.forRoot({
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),

    ProductModule,
    CartModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
