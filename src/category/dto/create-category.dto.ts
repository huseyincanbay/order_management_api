import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDTO } from 'src/product/dto/create-product.dto';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductDTO)
  products: ProductDTO[];
}
