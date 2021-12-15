import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { getUserCartKey } from "src/utils/utilities";
import { CacheService } from "../common/providers/cache.service";
import { ProductService } from "../product/product.service";
import { CartHelpers } from "./cart.helper";
import { Cart, CartDTO } from "./models/cart.model";
import { CartItem } from "./models/cartItem.model";


@Injectable()
export class CartService extends CartHelpers {

  constructor(
    private productService: ProductService,
    private cacheService: CacheService
  ) {
    super()
  }

  async saveUserCart(userId: string, cart: Cart) {
    const cartKey = getUserCartKey(userId);
    await this.cacheService.set(cartKey, cart);
  }

  async getUserCart(userId: string, asDTO = true) {
    const userCartKey = getUserCartKey(userId)
    const cart = await this.cacheService.get(userCartKey) as Cart

    if (!cart) {
      throw new NotFoundException('No cart found for user');
    }

    const data = asDTO ? this.transformCartToDTO(cart) : cart;
    return data;
  }

  async addCartItem(ownerId: string, productId: string, quantity: number) {
    let cart: Cart | null = null;

    cart = await this.getUserCart(ownerId, false) as Cart

    const productItem = await this.productService.getProduct(productId);

    const cartItem: CartItem = {
      id: productItem.id,
      title: productItem.title,
      price: productItem.price,
      image: productItem.image,
      quantity: quantity
    }

    if (!cart) {
      // create empty cart
      cart = {
        ownerId,
        total: 0,
        items: new Map()
      }
    }

    const itemInCart = cart.items.get(cartItem.id);

    if (!itemInCart) {
      return;
    }

    cart.items.set(cartItem.id, cartItem); // Add to cart if not existing in cart
    await this.saveUserCart(ownerId, cart);

    return this.transformCartToDTO(cart);
  }

  async removeCartItem(ownerId: string, productId: string) {
    const cart = await this.getUserCart(ownerId, false) as Cart;

    const itemIsInCart = cart.items.has(productId);

    if (!itemIsInCart) {
      throw new BadRequestException('Item is not in users cart');
    }

    cart.items.delete(productId);
    await this.saveUserCart(ownerId, cart);
  }

  async modifyItemQuantity(ownerId: string, productId: string, quantity: number) {
    const userCart = await this.getUserCart(ownerId, false) as Cart;

    const item = userCart.items.get(productId);

    if (!item) {
      throw new BadRequestException('Item is not in cart');
    }

    item.quantity = quantity;
    userCart.items.set(productId, item);

    await this.saveUserCart(ownerId, userCart);
  }

  async clearUserCart(userId: string) {
    await this.getUserCart(userId);
    const cartKey = getUserCartKey(userId);
    await this.cacheService.del(cartKey);
  }

}