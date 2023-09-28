// campaign.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CampaignDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
