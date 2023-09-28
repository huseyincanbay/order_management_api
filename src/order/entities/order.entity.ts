// order.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Campaign } from 'src/campaign/entities/campaign.entity'; // Import the Campaign Entity if you haven't already.

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  product: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Campaign, (campaign) => campaign.orders)
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;
}
