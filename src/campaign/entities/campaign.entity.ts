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

  @Column({ type: 'varchar', length: 255, nullable: true }) // Adjust length as needed
  type: string | null; // Adjust the entity field type to allow null

  viewOrders: any;

  // Other fields and methods specific to your Campaign entity, if needed
}
