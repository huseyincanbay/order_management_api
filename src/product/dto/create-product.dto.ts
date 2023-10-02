import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

export class ProductDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  list_price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock_quantity: number;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCategoryDto)
  category: CreateCategoryDto;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  product_id: number;
}
