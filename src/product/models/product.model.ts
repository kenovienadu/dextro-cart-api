import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Product extends Model {
  @PrimaryKey
  id: string

  @Column
  title: string

  @Column
  description: string;

  @Column
  image: string

  @Column
  price: number

  @Column({ defaultValue: false })
  isDeleted: boolean;
}