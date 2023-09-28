// campaign.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignDto } from './dto/create-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  async createCampaign(@Body() campaignDto: CampaignDto): Promise<Campaign> {
    return this.campaignService.createCampaign(campaignDto);
  }

  @Get(':id')
  async getCampaignById(@Param('id') id: number): Promise<Campaign> {
    return this.campaignService.getCampaignById(id);
  }

  @Get()
  async getAllCampaigns(): Promise<Campaign[]> {
    return this.campaignService.getAllCampaigns();
  }

  @Put(':id')
  async updateCampaign(
    @Param('id') id: number,
    @Body() campaignDto: CampaignDto,
  ): Promise<Campaign> {
    return this.campaignService.updateCampaign(id, campaignDto);
  }

  @Delete(':id')
  async deleteCampaign(@Param('id') id: number): Promise<void> {
    return this.campaignService.deleteCampaign(id);
  }
}
