// create-campaign.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CampaignDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString() // Make sure 'type' is not marked as @IsNotEmpty()
  type?: string; // Optional 'type' field
}
