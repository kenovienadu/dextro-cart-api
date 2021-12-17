import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductCategory } from "src/interfaces-and-types";
import { CreateProductDTO } from "./dtos/createProduct.dto";
import { ProductService } from "./product.service";


@Resolver('Product')
export class ProductResolver {
  constructor(
    private productService: ProductService
  ) { }

  @Query()
  getProducts(@Args('category') category: ProductCategory, @Args('page') page: number) {
    return this.productService.getProducts(category || '', page);
  }

  @Mutation()
  addProduct(@Args('data') data: CreateProductDTO) {
    return this.productService.createProduct(data);
  }
}