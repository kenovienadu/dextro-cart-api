import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ProductCategory } from "src/interfaces-and-types";
import { SuccessResponse } from "src/utils/successResponse";
import { CreateProductDTO } from "./dtos/createProduct.dto";
import { ProductService } from "./product.service";


@Controller('products')
export class ProductsController {
  constructor(
    private productService: ProductService
  ) { }

  @Get()
  async getProducts(@Query('category') category: ProductCategory | '') {
    const products = await this.productService.getProducts(category);
    return new SuccessResponse('products retrieved', products)
  }

  @Post()
  async addProduct(@Body() body: CreateProductDTO) {
    const productInfo = await this.productService.createProduct(body);
    return new SuccessResponse('product created', productInfo);
  }

  @Get(':id')
  async getProductInformation(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    return new SuccessResponse('product retrieved', product)
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteProduct(id);
    return new SuccessResponse('product deleted')
  }
}