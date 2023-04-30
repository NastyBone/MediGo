import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Record } from '../entities';
import { ResponseDoctorDto } from '../../doctor/dto';
import { ResponsePatientDto } from '../../patient/dto';

export class ResponseRecordDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => ResponseDoctorDto)
  doctor: ResponseDoctorDto;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => ResponsePatientDto)
  patient: ResponsePatientDto;

  constructor(data: Record) {
    this.id = data.id;
    this.date = data.date;
    this.description = data.description;
    this.doctor = new ResponseDoctorDto(data.doctor);
    this.patient = new ResponsePatientDto(data.patient);
  }
}
