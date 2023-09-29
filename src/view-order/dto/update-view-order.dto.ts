import { PartialType } from '@nestjs/mapped-types';
import { OrderDetailsDto } from './create-view-order.dto';

export class UpdateViewOrderDto extends PartialType(OrderDetailsDto) {}
