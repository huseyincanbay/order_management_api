import { PartialType } from '@nestjs/swagger';
import { ProductDTO } from './create-product.dto';

export class UpdateProductDto extends PartialType(ProductDTO) {}
