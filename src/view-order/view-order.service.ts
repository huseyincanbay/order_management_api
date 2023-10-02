import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewOrder } from './entities/view-order.entity';
import { OrderDetailsDto } from './dto/create-view-order.dto';

@Injectable()
export class OrderDetailViewService {
  constructor(
    @InjectRepository(ViewOrder)
    private readonly orderDetailViewRepository: Repository<ViewOrder>,
  ) {}

  async getOrderDetails(orderId: number): Promise<OrderDetailsDto | null> {
    const orderDetails = await this.orderDetailViewRepository
      .createQueryBuilder('orderDetailView')
      .where('orderDetailView.orderId = :orderId', { orderId })
      .getOne();

    if (!orderDetails) {
      return null;
    }

    const orderDetailsDto: OrderDetailsDto = {
      orderNumber: orderDetails.orderNumber,
      discountedAmount: orderDetails.discountedAmount,
      nonDiscountedAmount: orderDetails.nonDiscountedAmount,
    };

    return orderDetailsDto;
  }
}
