// view-order.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('view_order') // Use the actual name of your database view
export class ViewOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_number' }) // Map to the corresponding column name in your view
  orderNumber: string;

  @Column({ name: 'discounted_amount' }) // Map to the corresponding column name in your view
  discountedAmount: number;

  @Column({ name: 'non_discounted_amount' }) // Map to the corresponding column name in your view
  nonDiscountedAmount: number;

  // Add more columns as needed, mapping them to your view's column names
}
