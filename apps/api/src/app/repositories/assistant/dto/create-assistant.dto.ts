import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { Assistant } from '../entities';

export class CreateAssistantDto extends PartialType(
  OmitType(Assistant, ['deleted'])
) {
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
  userId!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;
}
