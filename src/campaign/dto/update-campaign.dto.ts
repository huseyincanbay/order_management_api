import { PartialType } from '@nestjs/mapped-types';
import { CampaignDto } from './create-campaign.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCampaignDto extends PartialType(CampaignDto) {
  @IsString()
  name?: string;

  @IsString() // Assuming 'type' is a string; adjust the validation as needed
  type?: string;

  @IsNumber({}, { each: true })
  orders?: number[];
}
