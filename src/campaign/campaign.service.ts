// campaign.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async createCampaign(campaignDto: CampaignDto): Promise<Campaign> {
    const campaign = new Campaign();
    campaign.name = campaignDto.name;
    return this.campaignRepository.save(campaign);
  }

  async getCampaignById(id: number): Promise<Campaign> {
    const campaign = await this.campaignRepository
      .createQueryBuilder('campaign')
      .leftJoinAndSelect('campaign.orders', 'orders')
      .where('campaign.id = :id', { id })
      .getOne();

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return campaign;
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    return this.campaignRepository.find({ relations: ['orders'] });
  }

  async updateCampaign(
    id: number,
    campaignDto: CampaignDto,
  ): Promise<Campaign> {
    const campaign = await this.getCampaignById(id);
    campaign.name = campaignDto.name;
    return this.campaignRepository.save(campaign);
  }

  async deleteCampaign(id: number): Promise<void> {
    const campaign = await this.getCampaignById(id);
    await this.campaignRepository.remove(campaign);
  }
}
