import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { InternalSettingsResponse } from './internal-settings-response.dto';

export class SettingsResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rif: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;

  constructor(_data: InternalSettingsResponse) {
    this.name = _data.name;
    this.rif = _data.rif;
    this.description = _data.description;
    this.type = _data.type;
  }
}
