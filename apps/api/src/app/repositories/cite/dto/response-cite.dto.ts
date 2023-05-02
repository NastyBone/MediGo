import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Cite } from '../entities';
import { ResponseDoctorDto } from '../../doctor/dto';
import { ResponsePatientDto } from '../../patient/dto';

export class ResponseCiteDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  time: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  patientConfirm: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => ResponseDoctorDto)
  doctor: ResponseDoctorDto;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => ResponsePatientDto)
  patient: ResponsePatientDto;

  constructor(data: Cite) {
    this.id = data.id;
    this.date = data.date;
    this.time = data.time;
    this.patientConfirm = data.patientConfirm;
    this.doctor = new ResponseDoctorDto(data.doctor);
    this.patient = new ResponsePatientDto(data.patient);
  }
}
