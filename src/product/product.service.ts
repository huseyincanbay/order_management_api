import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(productDto: ProductDTO): Promise<Product> {
    const product = new Product();
    product.title = productDto.title;
    product.list_price = productDto.list_price;
    product.stock_quantity = productDto.stock_quantity;
    product.author = productDto.author;

    return this.productRepository.save(product);
  }

  async getProductById(id: number): Promise<Product> {
    const order = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('order.id = :id', { id })
      .getOne();

    if (!order) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return order;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async updateProduct(id: number, productDto: ProductDTO): Promise<Product> {
    const product = await this.getProductById(id);
    product.title = productDto.title;
    product.list_price = productDto.list_price;
    product.stock_quantity = productDto.stock_quantity;
    product.author = productDto.author;

    return this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.getProductById(id);
    await this.productRepository.remove(product);
  }
}
