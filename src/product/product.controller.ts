import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productDto: ProductDTO): Promise<Product> {
    return this.productService.createProduct(productDto);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() productDto: ProductDTO,
  ): Promise<Product> {
    const product = await this.productService.updateProduct(id, productDto);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    try {
      await this.productService.deleteProduct(id);
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
