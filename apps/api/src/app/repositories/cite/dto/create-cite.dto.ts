import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { Cite } from '../entities';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';

export class CreateCiteDto extends PartialType(
  OmitType(Cite, ['updatedAt', 'createdAt', 'status', 'deleted'])
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subject!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  patientConfirm!: boolean;
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
  timeId!: number;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  @Type(() => Number)
  patientId!: number;
}

export class CiteReportDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  start!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  end!: string;

  @ApiProperty()
  @Optional()
  patientId!: number;

  @ApiProperty()
  @Optional()
  doctorId!: number;

  @ApiProperty()
  @Optional()
  status!: boolean;
}
