import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Speciality } from '../entities';

export class ResponseSpecialityDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  constructor(data: Speciality) {
    this.id = data.id;
    this.description = data.description;
  }
}