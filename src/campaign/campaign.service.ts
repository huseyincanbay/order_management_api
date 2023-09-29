import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CampaignDto } from './dto/create-campaign.dto';
import { Order } from '../order/entities/order.entity'; // Import the Order Entity

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

  // Calculate the benefit of a campaign for a given order.
  calculateCampaignBenefit(campaign: Campaign, order: Order): number {
    // Implement campaign-specific benefit calculation logic here.

    let benefit = 0; // Initialize benefit value.

    // Example: "Victor Hugo's Novel books - Buy 2 get 1 free" campaign.
    if (campaign.type === 'buy2get1free') {
      // Calculate the number of free items that can be added to the order.
      const eligibleQuantity = Math.floor(order.productQuantity / 2);

      // Calculate the benefit as the total price of the free items.
      // Replace 'productPrice' with the actual price of the product.
      // For example, if each product costs 'productPrice', you can calculate the benefit like this:
      const productPrice = order.productPrice; // Replace with the actual product price.
      benefit = eligibleQuantity * productPrice;
    }

    // Example: "5% discount on orders over 100 TL" campaign.
    if (campaign.type === 'discount5percent') {
      // Check if the order total is eligible for the discount.
      if (order.orderTotal >= 100) {
        // Calculate the benefit as a percentage of the order total.
        // Replace 'orderTotal' with the actual order total amount.
        // For example, if the order total is 'orderTotal', you can calculate the benefit like this:
        const orderTotal = order.orderTotal; // Replace with the actual order total.
        benefit = (orderTotal * 5) / 100;
      }
    }

    return benefit; // Return the calculated benefit value.
  }

  // Determine the most beneficial campaign for a given order.
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
