import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartModule } from './api/cart/cart.module';
import { ProductModule } from './api/product/product.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConnectionString } from 'connection-string';

require('dotenv').config()

const DB = new ConnectionString(process.env.DATABASE_URL);
const DATABASE_NAME = process.env.DB_NAME || 'testdb'
@Module({ 
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    CacheModule.register({
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: DB.host,
      port: 3306,
      username: DB.user,
      password: DB.password,
      autoLoadModels: true,
      synchronize: true,
      database: DATABASE_NAME
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
