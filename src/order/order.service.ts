// order.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(orderDto: OrderDto): Promise<Order> {
    const order = new Order();
    order.customerName = orderDto.customerName;
    order.product = orderDto.product;
    order.price = orderDto.price;
    // Assuming you have a Campaign entity with ID matching the campaignId in orderDto.
    order.campaign = { id: orderDto.campaignId } as any;

    return this.orderRepository.save(order);
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.campaign', 'campaign')
      .where('order.id = :id', { id })
      .getOne();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['campaign'] });
  }

  async updateOrder(id: number, orderDto: OrderDto): Promise<Order> {
    const order = await this.getOrderById(id);

    order.customerName = orderDto.customerName;
    order.product = orderDto.product;
    order.price = orderDto.price;
    // Assuming you have a Campaign entity with ID matching the campaignId in orderDto.
    order.campaign = { id: orderDto.campaignId } as any;

    return this.orderRepository.save(order);
  }

  async deleteOrder(id: number): Promise<void> {
    const order = await this.getOrderById(id);
    await this.orderRepository.remove(order);
  }
}
