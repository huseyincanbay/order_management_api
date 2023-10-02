import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CampaignDto } from './dto/create-campaign.dto';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async createCampaign(campaignDto: CampaignDto): Promise<Campaign> {
    const campaign = new Campaign();
    campaign.name = campaignDto.name;
    campaign.type = campaignDto.type || null;
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

  calculateCampaignBenefit(campaign: Campaign, order: Order): number {
    let benefit = 0;

    if (campaign.type === 'buy2get1free') {
      const eligibleQuantity = Math.floor(order.productQuantity / 2);
      const productPrice = order.productPrice;
      benefit = eligibleQuantity * productPrice;
    }
    if (campaign.type === 'discount5percent') {
      if (order.orderTotal >= 100) {
        const orderTotal = order.orderTotal;
        benefit = (orderTotal * 5) / 100;
      }
    }

    return benefit;
  }

  async getMostBeneficialCampaign(order: Order): Promise<Campaign> {
    let mostBeneficialCampaign: Campaign | null = null;
    let maxBenefit = 0;

    for (const campaign of await this.getAllCampaigns()) {
      const benefit = this.calculateCampaignBenefit(campaign, order);
      if (benefit > maxBenefit) {
        mostBeneficialCampaign = campaign;
        maxBenefit = benefit;
      }
    }

    return mostBeneficialCampaign;
  }
}
