import { PartialType } from '@nestjs/mapped-types';
import { OrderDto } from './create-order.dto';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateOrderDto extends PartialType(OrderDto) {
  @IsString()
  customerName?: string;

  @IsString()
  product?: string;

  @IsNumber()
  @IsPositive()
  price?: number;

  @IsNumber()
  campaignId?: number;
}
