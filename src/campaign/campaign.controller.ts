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
import { OrderService } from '../order/order.service'; // Import the OrderService

@Controller('campaigns')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly orderService: OrderService, // Inject OrderService
  ) {}

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

  @Get('calculate-benefit/:campaignId/:orderId')
  async calculateCampaignBenefit(
    @Param('campaignId') campaignId: number,
    @Param('orderId') orderId: number,
  ): Promise<number> {
    console.log(
      `calculateCampaignBenefit called with campaignId: ${campaignId} and orderId: ${orderId}`,
    );
    const campaign = await this.campaignService.getCampaignById(campaignId);
    const order = await this.orderService.getOrderById(orderId);
    console.log('Campaign:', campaign);
    console.log('Order:', order);
    const benefit = this.campaignService.calculateCampaignBenefit(
      campaign,
      order,
    );
    return benefit;
  }

  // Endpoint to select the most beneficial campaign for a specific order.
  @Get('select-most-beneficial/:orderId')
  async selectMostBeneficialCampaign(
    @Param('orderId') orderId: number,
  ): Promise<Campaign | null> {
    console.log(`selectMostBeneficialCampaign called with orderId: ${orderId}`);
    const order = await this.orderService.getOrderById(orderId);
    console.log('Order:', order);
    const mostBeneficialCampaign =
      this.campaignService.getMostBeneficialCampaign(order);
    return mostBeneficialCampaign;
  }
}
