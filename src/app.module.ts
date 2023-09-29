import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { CampaignModule } from './campaign/campaign.module';
import { ViewOrderModule } from './view-order/view-order.module';
import { Order } from './order/entities/order.entity';
import { Campaign } from './campaign/entities/campaign.entity';
import { ViewOrder } from './view-order/entities/view-order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '123',
      username: 'postgres',
      entities: [Order, Campaign, ViewOrder],
      database: 'turkticaret-casestudy',
      synchronize: true,
      logging: true,
    }),
    OrderModule,
    CampaignModule,
    ViewOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
