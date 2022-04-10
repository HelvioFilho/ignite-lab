import { PurchasesService } from './../services/purchase.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import { ApolloDriver } from '@nestjs/apollo';
import path from 'node:path';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ProductsService } from '../services/products.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Services
    ProductsResolver,
    PurchasesResolver,

    //Resolvers
    ProductsService,
    PurchasesService
  ],
})
// eslint-disable-next-line prettier/prettier
export class HttpModule { }
