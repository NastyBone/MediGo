import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { Record } from '../entities';

import { Type } from 'class-transformer';

export class CreateRecordDto extends PartialType(
  OmitType(Record, ['updatedAt', 'createdAt', 'status', 'deleted'])
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date!: string;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  @Type(() => Number)
  doctorId!: number;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  @Type(() => Number)
  patientId!: number;
}
