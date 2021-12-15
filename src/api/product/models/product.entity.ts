import { Column, IsIn, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ProductCategory } from 'src/interfaces-and-types';

@Table
export class Product extends Model {

  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string

  @Column
  title: string

  @Column
  description: string;

  @Column
  image: string

  @Column
  price: number

  @Column
  stock: number

  @IsIn([
    [ProductCategory.PHONES],
    [ProductCategory.LAPTOPS],
  ])
  @Column
  category: string

  @Column({ defaultValue: false })
  isDeleted: boolean;
}