import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailsDto {
  @ApiProperty()
  orderNumber: string;

  @ApiProperty()
  discountedAmount: number;

  @ApiProperty()
  nonDiscountedAmount: number;
}
