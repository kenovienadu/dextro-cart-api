import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { TWENTY_FOUR_HOURS } from "src/constants";
import { getUserCartKey } from "src/utils/utilities";
import { CacheService } from "../common/providers/cache.service";
import { ProductService } from "../product/product.service";
import { Cart, CartDTO } from "./models/cart.model";
import { CartItem } from "./models/cartItem.model";

@Injectable()
export class CartService {

  constructor(
    private productService: ProductService,
    private cacheService: CacheService,
  ) { }

  async saveUserCart(userId: string, cart: Cart) {
    const cartKey = getUserCartKey(userId);
    await this.cacheService.set(cartKey, cart, TWENTY_FOUR_HOURS);
  }

  async getUserCart(userId: string, asDTO = true) {
    const userCartKey = getUserCartKey(userId)
    const cart = await this.cacheService.get(userCartKey) as Cart

    if (!cart) {
      throw new NotFoundException('No cart found for user');
    }

    const data = asDTO ? this.transformCartToDTO(cart) : cart;

    console.log(data);

    return data;
  }

  async addCartItem(ownerId: string, productId: string, quantity: number) {
    let cart: Cart | null = null;

    const userCartKey = getUserCartKey(ownerId)
    cart = await this.cacheService.get(userCartKey) as Cart

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

    if (itemInCart) {
      return this.transformCartToDTO(cart);
    }

    cart.items.set(cartItem.id, cartItem); // Add to cart if not existing in cart
    cart.total = this.getCartTotal([cartItem])

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

    return this.transformCartToDTO(cart);
  }

  async modifyItemQuantity(ownerId: string, productId: string, quantity: number) {
    console.log('DEBUG', ownerId);
    let userCart = await this.getUserCart(ownerId, false) as Cart;

    const item = userCart.items.get(productId);

    if (!item) {
      throw new BadRequestException('Item is not in cart');
    }

    if (quantity === 0) {
      const cartDTO = await this.removeCartItem(ownerId, productId);
      return cartDTO;
    }

    item.quantity = quantity;
    userCart.items.set(productId, item);

    await this.saveUserCart(ownerId, userCart);

    return this.transformCartToDTO(userCart);
  }

  async clearUserCart(userId: string) {
    await this.getUserCart(userId);
    const cartKey = getUserCartKey(userId);
    await this.cacheService.del(cartKey);
  }

  transformCartToDTO(cart: Cart): CartDTO {
    const items = Array.from(cart.items, ([_, item]) => item);
    const total = this.getCartTotal(items);

    return {
      items,
      total,
      ownerId: cart.ownerId,
    }
  }

  getCartTotal(items: CartItem[]) {
    let total = 0;

    for (const item of items) {
      total += (item.price * item.quantity)
    }

    return total;
  }

}