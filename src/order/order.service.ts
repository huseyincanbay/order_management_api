// order.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDto } from './dto/create-order.dto';
import { Campaign } from 'src/campaign/entities/campaign.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createOrder(orderDto: OrderDto): Promise<Order> {
    const order = new Order();
    order.customerName = orderDto.customerName;
    order.price = orderDto.price;
    order.campaign = { id: orderDto.campaignId } as any;

    // Fetch the product from the database
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id = :productId', { productId: orderDto.productId })
      .getOne();

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${orderDto.productId} not found`,
      );
    }

    order.product = product;

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
    order.price = orderDto.price;

    if (orderDto.productId) {
      const product = await this.productRepository
        .createQueryBuilder('product')
        .where('product.id = :productId', { productId: orderDto.productId })
        .getOne();

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${orderDto.productId} not found`,
        );
      }

      order.product = product;
    } else {
      order.product = null;
    }

    if (orderDto.campaignId) {
      const campaign = new Campaign();
      campaign.id = orderDto.campaignId;
      order.campaign = campaign;
    } else {
      order.campaign = null;
    }

    return this.orderRepository.save(order);
  }

  async deleteOrder(id: number): Promise<void> {
    const order = await this.getOrderById(id);
    await this.orderRepository.remove(order);
  }
}
