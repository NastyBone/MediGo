import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { Cite } from '../entities';
import { Type } from 'class-transformer';

export class CreateCiteDto extends PartialType(
  OmitType(Cite, ['updatedAt', 'createdAt', 'status', 'deleted'])
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subject!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  time!: string;

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
  patientId!: number;
}
