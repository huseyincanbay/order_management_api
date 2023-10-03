import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  title: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  constructor(category?: Partial<Category>) {
    Object.assign(this, category);
  }
}
