import { PartialType } from '@nestjs/mapped-types';
import { CampaignDto } from './create-campaign.dto';

export class UpdateCampaignDto extends PartialType(CampaignDto) {}
