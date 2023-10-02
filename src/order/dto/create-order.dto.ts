import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPositive,
  IsOptional,
} from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  campaignId?: number;
}
