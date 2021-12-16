import { Module } from "@nestjs/common";
import { CommonModule } from "../common/common.module";
import { ProductModule } from "../product/product.module";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";


@Module({
  imports: [CommonModule, ProductModule],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule { }