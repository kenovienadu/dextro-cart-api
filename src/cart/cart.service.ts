import { Injectable } from "@nestjs/common";


@Injectable()
export class CartService {

  getUserCart(userId: string) { }

  addCartItem(userId: string, productId: string, quantity: number) { }

  removeCartItem(productId: string) { }

  modifyItemQuantity(productId: string, quantity: number) { }

  clearUserCart(userId: string) { }

}