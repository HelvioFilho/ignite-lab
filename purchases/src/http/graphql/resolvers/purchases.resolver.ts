import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { PurchasesService } from '../../../services/purchase.service';
import { Purchase } from '../models/purchase';

@Resolver()
export class PurchasesResolver {

  constructor(private purchasesService: PurchasesService) { }

  @Query(() => [Purchase])
  // @UseGuards(AuthorizationGuard)
  purchase() {
    return this.purchasesService.listAllPurchases();
  }

}