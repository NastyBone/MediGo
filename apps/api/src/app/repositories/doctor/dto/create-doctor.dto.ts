import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { Doctor } from '../entities';
import { Type } from 'class-transformer';

export class CreateDoctorDto extends PartialType(
  OmitType(Doctor, ['updatedAt', 'createdAt', 'status', 'deleted'])
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  @Type(() => Number)
  doctorId!: number;
}
