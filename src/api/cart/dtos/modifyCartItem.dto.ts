

import { IsNumber, IsString } from "class-validator";


export class ModifyCartItemDTO {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number
}