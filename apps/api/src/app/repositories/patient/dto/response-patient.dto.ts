import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Patient } from '../entities';
import { ResponseUserDto } from '../../users/dto';

export class ResponsePatientDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => ResponseUserDto)
  user: ResponseUserDto;

  constructor(data: Patient) {
    this.id = data.id;
    this.address = data.address;
    this.phone = data.phone;
    this.user = new ResponseUserDto(data.user);
  }
}
