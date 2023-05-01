import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Doctor } from '../entities';
import { ResponseSpecialityDto } from '../../speciality/dto';
import { ResponseUserDto } from '../../users/dto';

export class ResponseDoctorDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => ResponseSpecialityDto)
  speciality: ResponseSpecialityDto;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => ResponseUserDto)
  user: ResponseUserDto;

  constructor(data: Doctor) {
    this.id = data.id;
    this.phone = data.phone;
    this.speciality = new ResponseSpecialityDto(data.speciality);
    this.user = new ResponseUserDto(data.user);
  }
}
