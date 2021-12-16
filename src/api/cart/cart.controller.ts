import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SuccessResponse } from "src/utils/successResponse";
import { CartService } from "./cart.service";
import { AddToCartDTO } from "./dtos/addToCart.dto";
import { ModifyCartItemDTO } from "./dtos/modifyCartItem.dto";
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

  @Put(':userId')
  async modifyItemInCart(
    @Body() body: ModifyCartItemDTO,
    @Param('userId') userId: string,
  ) {
    const data = await this.cartService.modifyItemQuantity(userId, body.productId, body.quantity);
    return new SuccessResponse('cart modified', data);
  }

  @Delete(':userId/:productId')
  async removeCartItem(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    const data = await this.cartService.removeCartItem(userId, productId);
    return new SuccessResponse('cart modified', data);
  }

  @Delete(':userId/clear')
  async clearCart(@Param('userId') userId: string) {
    await this.cartService.clearUserCart(userId);
    return new SuccessResponse('cart cleared')
  }


}