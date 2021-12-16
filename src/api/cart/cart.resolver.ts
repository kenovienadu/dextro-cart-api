import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CartService } from "./cart.service";



@Resolver('Cart')
export class CartResolver {

  constructor(
    private cartService: CartService
  ) { }

  @Query()
  getUserCart(@Args('id') id: string) {
    return this.cartService.getUserCart(id);
  }

  @Query()
  clearUserCart(@Args('id') id: string) {
    return this.cartService.clearUserCart(id);
  }

  @Query()
  removeItemInCart(@Args('userId') userId: string, @Args('productId') productId: string) {
    return this.cartService.removeCartItem(userId, productId)
  }

  @Mutation()
  addToCart(@Args('data') data) {
    return this.cartService.addCartItem(data.ownerId, data.productId, data.quantity)
  }

  @Mutation()
  modifyCartItem(@Args('data') data) {
    return this.cartService.modifyItemQuantity(data.ownerId, data.productId, data.quantity)
  }

}