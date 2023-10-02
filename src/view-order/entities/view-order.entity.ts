// view-order.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('view_order') // we will use the actual name of our database view
export class ViewOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_number' })
  orderNumber: string;

  @Column({ name: 'discounted_amount' })
  discountedAmount: number;

  @Column({ name: 'non_discounted_amount' })
  nonDiscountedAmount: number;
}
