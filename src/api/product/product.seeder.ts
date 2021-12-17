import { Injectable, OnModuleInit } from "@nestjs/common";
import { ProductCategory } from "src/interfaces-and-types";
import { envIsProd, generateId, generateProductSKU } from "src/utils/utilities";
import { Product } from "./models/product.entity";
import { ProductRepository } from "./product.repository";
import * as faker from 'faker';


@Injectable()
export class ProductSeeder implements OnModuleInit {
  constructor(
    private productRepository: ProductRepository
  ) { }

  async onModuleInit() {

    if (!envIsProd()) {
      return;
    }

    await this.clearProducts();
    await this.seed(); 
  }

  async clearProducts() {
    await this.productRepository.productModel.destroy({
      where: {}
    });
  }

  async seed(target = 100) {
    let products = [];

    for (let i = 0; i < target; i++) {
      const product = this.generateFakeProduct();
      products.push(product);
    }

    const addedProducts = await this.productRepository.createBulk(products);

    if (!addedProducts?.length) {
      console.log('PRODUCT SEEDING FAILED');
      return;
    }

    console.log('PRODUCT SEEDING SUCCESS');
  }

  generateFakeProduct() {
    const product: Partial<Product> = {
      id: generateId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: +faker.commerce.price(5000, 300000, 0),
      stock: faker.datatype.number(1000),
      image: faker.image.imageUrl(),
      category: faker.datatype.boolean() ? ProductCategory.PHONES : ProductCategory.LAPTOPS,
      sku: ''
    }

    product.sku = generateProductSKU(product.title, product.stock, product.category as ProductCategory)

    return product;
  }
}