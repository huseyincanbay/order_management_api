import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewOrder } from './entities/view-order.entity';
import { OrderDetailViewService } from './view-order.service';
import { OrderDetailViewController } from './view-order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ViewOrder])],
  controllers: [OrderDetailViewController],
  providers: [OrderDetailViewService],
})
export class ViewOrderModule {}
