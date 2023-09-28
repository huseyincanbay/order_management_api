// order.dto.ts

import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  product: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  campaignId: number; // This corresponds to the campaign the order belongs to.
}
