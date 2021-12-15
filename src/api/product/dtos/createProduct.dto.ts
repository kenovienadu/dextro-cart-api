import { IsEnum, IsNumber, IsOptional, IsString, IsIn } from "class-validator";
import { ProductCategory } from "src/interfaces-and-types";


export class CreateProductDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsIn([ProductCategory.PHONES, ProductCategory.LAPTOPS])
  category: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  image: string
}