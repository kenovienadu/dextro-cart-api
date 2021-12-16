import { CartItem } from "./cartItem.model";

export class Cart {
  ownerId: string;
  items: Map<string, CartItem>;
  total: number
}

export class CartDTO {
  ownerId: string;
  items: CartItem[];
  total: number
}