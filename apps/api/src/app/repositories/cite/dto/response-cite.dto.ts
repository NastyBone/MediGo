import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Cite } from '../entities';
import { ResponseDoctorDto } from '../../doctor/dto';
import { ResponsePatientDto } from '../../patient/dto';
import { ResponseAvailabilityDto } from '../../availability/dto';

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
  subject: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  patientConfirm: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => ResponseAvailabilityDto)
  time: ResponseAvailabilityDto;

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
    this.time = new ResponseAvailabilityDto(data.time);
    this.subject = data.subject;
    this.patientConfirm = data.patientConfirm;
    this.doctor = new ResponseDoctorDto(data.doctor);
    this.patient = new ResponsePatientDto(data.patient);
  }
}
