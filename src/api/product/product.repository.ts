import { Injectable } from "@nestjs/common";
import { ProductCategory } from "src/interfaces-and-types";
import { CatchAndReturnNull, generateId, generateProductSKU } from "src/utils/utilities";
import { Product } from "./models/product.entity";
import { Repository, Sequelize } from 'sequelize-typescript';

@Injectable()
export class ProductRepository {

  // constructor(@InjectModel(Product) private productModel: typeof Product) { }

  productModel: Repository<Product>

  constructor(private sequelize: Sequelize) {
    this.productModel = this.sequelize.getRepository(Product);
  }


  async addProduct(details: Pick<Product, 'title' | 'description' | 'image' | 'stock' | 'price' | 'category'>) {
    const sku = generateProductSKU(details.title, details.stock, details.category as ProductCategory);

    const product = await this.productModel.create({
      ...details,
      sku,
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

  async getProducts(category: ProductCategory | '' = '', page = 1, isDeleted: boolean = false): Promise<Product[] | null> {

    const filterQuery = category ? {
      where: {
        category: category,
        isDeleted
      }
    } : {
      where: {
        isDeleted
      }
    };

    const limit = 20;
    const offset = page > 1 ? page * limit : 0;

    const products = await this.productModel.findAll({
      ...filterQuery,
      offset,
      limit,
    }).catch(CatchAndReturnNull);

    return products as Product[] || null
  }

  async deleteProduct(id: string) {
    const product = await this.getProduct(id);

    if (!product) {
      return false;
    }

    product.isDeleted = true;
    await product.save();

    return true;
  }

  async createBulk(products: Pick<Product, 'title' | 'description' | 'image' | 'stock' | 'price'>[]) {
    const savedProducts = await this.productModel.bulkCreate(products);
    return savedProducts?.length ? savedProducts : [];
  }
}