// campaign.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from 'src/order/entities/order.entity'; // Import the Order Entity if you haven't already.

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Order, (order) => order.campaign, { cascade: true })
  orders: Order[];
}
