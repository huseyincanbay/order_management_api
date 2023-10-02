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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body() categoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(categoryDto);
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number): Promise<Category> {
    const category = await this.categoryService.getCategoryById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() categoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryService.updateCategory(id, categoryDto);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    try {
      await this.categoryService.deleteCategory(id);
    } catch (error) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
