import { IsBoolean, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class ConfigDeleteDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  file_image?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  name?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  rif?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  description?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  daysToReport?: boolean;
}
