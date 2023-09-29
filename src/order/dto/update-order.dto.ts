import { PartialType } from '@nestjs/mapped-types';
import { OrderDto } from './create-order.dto';
import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto extends PartialType(OrderDto) {
  @IsNotEmpty({ message: 'At least one field must be provided for update.' })
  customerName?: string;

  @IsNotEmpty({ message: 'At least one field must be provided for update.' })
  product?: string;

  @IsNumber()
  @IsPositive()
  price?: number;

  @IsNumber()
  campaignId?: number;
}
