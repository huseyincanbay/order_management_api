import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  list_price: number;

  @Column({ type: 'int' })
  stock_quantity: number;

  @Column()
  author: string;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  constructor(product?: Partial<Product>) {
    Object.assign(this, product);
  }
}
