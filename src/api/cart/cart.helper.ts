
import { Cart, CartDTO } from "./models/cart.model";
import { CartItem } from "./models/cartItem.model";


export class CartHelpers {

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