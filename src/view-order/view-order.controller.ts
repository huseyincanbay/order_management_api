// order-detail-view.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { OrderDetailViewService } from './view-order.service';
import { OrderDetailsDto } from './dto/create-view-order.dto';

@Controller('order-details')
export class OrderDetailViewController {
  constructor(
    private readonly orderDetailViewService: OrderDetailViewService,
  ) {}

  @Get(':orderId')
  async getOrderDetails(
    @Param('orderId') orderId: number,
  ): Promise<OrderDetailsDto> {
    return this.orderDetailViewService.getOrderDetails(orderId);
  }
}
