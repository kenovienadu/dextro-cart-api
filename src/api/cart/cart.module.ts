import { Module } from "@nestjs/common";
import { CommonModule } from "../common/common.module";
import { ProductModule } from "../product/product.module";
import { CartController } from "./cart.controller";
import { CartResolver } from "./cart.resolver";
import { CartService } from "./cart.service";


@Module({
  imports: [CommonModule, ProductModule],
  providers: [CartService, CartResolver],
  controllers: [CartController]
})
export class CartModule { }