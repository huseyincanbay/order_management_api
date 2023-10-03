import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity'; // Import the Category entity
import { CreateCategoryDto } from './dto/create-category.dto'; // Import the Category DTO

@Injectable()
export class CategoryService {
  productRepository: any;
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(categoryDto: CreateCategoryDto): Promise<Category> {
    const { products, ...categoryData } = categoryDto;

    const category = new Category(categoryData);

    if (products) {
      const productEntities = await Promise.all(
        products.map(async (p) => {
          const productEntity = await this.productRepository.findOne(
            p.product_id,
          );
          if (!productEntity) {
            throw new NotFoundException(
              `Product with ID ${p.product_id} not found.`,
            );
          }
          return productEntity;
        }),
      );

      category.products = productEntities;
    }

    return await this.categoryRepository.save(category);
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'products')
      .where('category.id = :id', { id })
      .getOne();

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async updateCategory(
    id: number,
    categoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);

    const { products, ...categoryData } = categoryDto;
    Object.assign(category, categoryData);

    if (products) {
      const productEntities = await Promise.all(
        products.map(async (p) => {
          const productEntity = await this.productRepository.findOne(
            p.product_id,
          );
          if (!productEntity) {
            throw new NotFoundException(
              `Product with ID ${p.product_id} not found.`,
            );
          }
          return productEntity;
        }),
      );

      category.products = productEntities;
    }

    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.getCategoryById(id);
    await this.categoryRepository.remove(category);
  }
}
