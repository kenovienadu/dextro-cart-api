
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductCategory } from "src/interfaces-and-types";
import { CreateProductDTO } from "./dtos/createProduct.dto";
import { Product } from "./models/product.entity";
import { ProductRepository } from "./product.repository";


@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository
  ) { }

  async createProduct(details: CreateProductDTO) {
    const product = await this.productRepository.addProduct(details);

    if (!product) {
      throw new BadRequestException('Unable to create product. Please try again');
    }

    return product.toJSON();
  }

  async getProduct(id: string) {
    const product = await this.productRepository.getProduct(id);

    if (!product) {
      throw new NotFoundException('Sorry, product not found')
    }

    return product.toJSON() as Pick<Product, 'id' | 'image' | 'description' | 'title' | 'price' | 'stock'>;
  }

  async getProductsInCategory(category: ProductCategory | '' = '', deleted = false) {
    const products = await this.productRepository.getProducts(category, deleted);

    if (!products.length) {
      throw new NotFoundException('No products found');
    }

    return products.map(product => product.toJSON())
  }

  async deleteProduct(id: string) {
    const deleted = await this.productRepository.deleteProduct(id);

    if (!deleted) {
      throw new BadRequestException('Failed to delete product. Please try again later');
    }

    return true;
  }
}