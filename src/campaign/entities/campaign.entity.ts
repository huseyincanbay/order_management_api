// campaign.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Order, (order) => order.campaign, { cascade: true })
  orders: Order[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  type: string | null;

  viewOrders: any;
}
