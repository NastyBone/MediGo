import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { Speciality } from '../entities';

export class CreateSpecialityDto extends PartialType(
  OmitType(Speciality, ['updatedAt', 'createdAt', 'status', 'deleted'])
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description!: string;
}
