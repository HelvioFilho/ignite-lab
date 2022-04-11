import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { PurchasesService } from './../services/purchases.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import path from 'node:path';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ProductsService } from '../services/products.service';
import { CustomersService } from '../services/customers.service';
import { MessagingModule } from '../messaging/messaging.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Services
    ProductsResolver,
    PurchasesResolver,
    CustomersResolver,

    //Resolvers
    ProductsService,
    PurchasesService,
    CustomersService
  ],
})
// eslint-disable-next-line prettier/prettier
export class HttpModule { }
