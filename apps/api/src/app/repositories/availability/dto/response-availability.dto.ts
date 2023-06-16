import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
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
  @Type(() => ResponseDoctorDto)
  doctor!: ResponseDoctorDto;

  constructor(data: Availability) {
    this.id = data.id;
    this.start = data.start;
    this.end = data.end;
    this.day = data.day;
    this.doctor = new ResponseDoctorDto(data.doctor);
    this.available = data.available;
  }
}
