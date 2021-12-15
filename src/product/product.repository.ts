import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { ProductCategory } from "src/interfaces";
import { CatchAndReturnNull, generateId } from "src/utilities";
import { Product } from "./models/product.model";

@Injectable()
export class ProductRepository {

  constructor(
    @InjectModel(Product)
    private productModel: typeof Product
  ) { }

  async addProduct(details: Pick<Product, 'title' | 'description' | 'image' | 'stock' | 'price'>) {
    const product = await this.productModel.create({
      ...details,
      id: generateId()
    });

    return product || null;
  }

  async modifyProduct(id: string, updates: Pick<Product, 'title' | 'description' | 'image' | 'stock' | 'price'>) {
    const product = await this.productModel.findOne({ where: { id } });

    if (!product) {
      return null;
    }

    const modified = await product.set({ ...updates });
    return modified;
  }

  async getProduct(id: string) {
    const product = await this.productModel.findOne({ where: { id } });
    return product || null;
  }

  async getProducts(category: ProductCategory | null = null) {

    const filterQuery = category ? {
      where: {
        category: category
      }
    } : {};

    const products = await this.productModel.findAll(filterQuery).catch(CatchAndReturnNull);

    return products
  }

  async deleteProduct(id: string) {
    const product = await this.getProduct(id);

    if (!product) {
      return null;
    }

    product.isDeleted = true;
    await product.save();
  }
}