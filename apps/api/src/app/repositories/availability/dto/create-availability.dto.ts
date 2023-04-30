import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { Availability } from '../entities';

export class CreateAvailabilityDto extends PartialType(
  OmitType(Availability, ['updatedAt', 'createdAt', 'deleted'])
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  time!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  available!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  doctorId!: number;
}
