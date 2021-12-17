
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum ProductCategory {
    PHONES = "PHONES",
    LAPTOPS = "LAPTOPS"
}

export class AddToCartDTO {
    ownerId: string;
    productId: string;
    quantity: number;
}

export class ModifyCartItemDTO {
    ownerId: string;
    productId: string;
    quantity: number;
}

export class AddProductInput {
    title: string;
    description?: Nullable<string>;
    image?: Nullable<string>;
    price: number;
    stock: number;
    category: ProductCategory;
}

export class CartItem {
    id: string;
    title: string;
    image?: Nullable<string>;
    price: number;
    quantity: number;
}

export class Cart {
    ownerId: string;
    items: Nullable<CartItem>[];
    total: number;
}

export abstract class IQuery {
    abstract getUserCart(id: string): Nullable<Cart> | Promise<Nullable<Cart>>;

    abstract clearUserCart(id: string): Nullable<Cart> | Promise<Nullable<Cart>>;

    abstract removeItemInCart(userId?: Nullable<string>, productId?: Nullable<string>): Nullable<Cart> | Promise<Nullable<Cart>>;

    abstract getProducts(category?: Nullable<ProductCategory>, page?: Nullable<number>): Nullable<Nullable<Product>[]> | Promise<Nullable<Nullable<Product>[]>>;
}

export abstract class IMutation {
    abstract addToCart(data?: Nullable<AddToCartDTO>): Nullable<Cart> | Promise<Nullable<Cart>>;

    abstract modifyCartItem(data?: Nullable<ModifyCartItemDTO>): Nullable<Cart> | Promise<Nullable<Cart>>;

    abstract addProduct(data?: Nullable<AddProductInput>): Nullable<Product> | Promise<Nullable<Product>>;
}

export class Product {
    id: string;
    title: string;
    description?: Nullable<string>;
    image?: Nullable<string>;
    price: number;
    stock: number;
    sku: string;
    category: ProductCategory;
    isDeleted: boolean;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

type Nullable<T> = T | null;
