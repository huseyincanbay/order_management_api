import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Campaign } from 'src/campaign/entities/campaign.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Campaign, (campaign) => campaign.orders)
  campaign: Campaign;
  productQuantity: number;
  productPrice: any;
  orderTotal: number;
  viewOrders: any;
}
