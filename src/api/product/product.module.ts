import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./models/product.entity";
import { ProductsController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { ProductService } from "./product.service";


@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductService, ProductRepository],
  exports: [SequelizeModule, ProductService]
})
export class ProductModule { }