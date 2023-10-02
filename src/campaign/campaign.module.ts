// campaign.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign]), OrderModule],
  providers: [CampaignService],
  controllers: [CampaignController],
})
export class CampaignModule {}
