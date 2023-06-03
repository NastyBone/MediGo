import { IsBoolean, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class SettingsDeleteDto {
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
  type?: boolean;
}
