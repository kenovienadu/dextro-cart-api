import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SuccessResponse } from "src/utils/successResponse";
import { CartService } from "./cart.service";
import { AddToCartDTO } from "./dtos/addToCart.dto";
import { CartDTO } from "./models/cart.model";


@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService
  ) { }

  @Get(':userId')
  async getUserCart(@Param('userId') userId: string) {
    const cartData = await this.cartService.getUserCart(userId) as CartDTO;
    return new SuccessResponse('cart retrieved', cartData)
  }

  @Post(':userId')
  async addItemToCart(@Body() body: AddToCartDTO, @Param('userId') userId: string) {
    const data = await this.cartService.addCartItem(userId, body.productId, body.quantity);
    return new SuccessResponse('cart added', data)
  }

  @Get('clear/:userId')
  async clearCart(@Param('userId') userId: string) {
    await this.cartService.clearUserCart(userId);
    return new SuccessResponse('cart cleared')
  }


}