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
    // Implement logic to fetch order details by orderId from the view
    const orderDetails = await this.orderDetailViewRepository
      .createQueryBuilder('orderDetailView')
      .where('orderDetailView.orderId = :orderId', { orderId })
      .getOne();

    if (!orderDetails) {
      return null; // Order not found
    }

    // Map the data to OrderDetailsDto and return it
    const orderDetailsDto: OrderDetailsDto = {
      orderNumber: orderDetails.orderNumber,
      discountedAmount: orderDetails.discountedAmount,
      nonDiscountedAmount: orderDetails.nonDiscountedAmount,
      // Map other properties as needed
    };

    return orderDetailsDto;
  }
}
