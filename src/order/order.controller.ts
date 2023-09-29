import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderDto: OrderDto): Promise<Order> {
    try {
      const createdOrder = await this.orderService.createOrder(orderDto);
      return createdOrder;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    try {
      const order = await this.orderService.getOrderById(id);
      return order;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: number,
    @Body() orderDto: OrderDto,
  ): Promise<Order> {
    try {
      const updatedOrder = await this.orderService.updateOrder(id, orderDto);
      return updatedOrder;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<void> {
    try {
      await this.orderService.deleteOrder(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
