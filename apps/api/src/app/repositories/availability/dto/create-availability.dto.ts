import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { Availability } from '../entities';

export class CreateAvailabilityDto extends PartialType(
  OmitType(Availability, ['updatedAt', 'createdAt', 'deleted'])
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  start!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  end!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  day!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  available!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  doctorId!: number;
}
