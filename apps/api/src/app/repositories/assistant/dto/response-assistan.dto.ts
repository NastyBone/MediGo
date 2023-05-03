import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Assistant } from '../entities';
import { ResponseDoctorDto } from '../../doctor/dto';
import { ResponseUserPatientDto } from '../../users/dto';

export class ResponseAssistantDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => ResponseDoctorDto)
  doctor: ResponseDoctorDto;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => ResponseUserPatientDto)
  user: ResponseUserPatientDto;

  constructor(data: Assistant) {
    this.id = data.id;
    this.doctor = new ResponseDoctorDto(data.doctor);
    this.user = new ResponseUserPatientDto(data.user);
  }
}
