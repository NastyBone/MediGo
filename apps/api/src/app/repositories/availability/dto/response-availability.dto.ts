import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Availability } from '../entities';
import { ResponseDoctorDto } from '../../doctor/dto';

export class ResponseAvailabilityDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  time!: string;

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
  @Type(() => ResponseDoctorDto)
  doctor!: ResponseDoctorDto;

  constructor(data: Availability) {
    this.id = data.id;
    this.time = data.time;
    this.day = data.day;
    this.doctor = new ResponseDoctorDto(data.doctor);
  }
}
