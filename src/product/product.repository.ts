import { Injectable } from "@nestjs/common";


@Injectable()
export class ProductRepository {
  addProduct() { }

  modifyProduct() { }

  getProduct(productId: string) { }

  getProducts() { }

  deleteProduct() { }
}