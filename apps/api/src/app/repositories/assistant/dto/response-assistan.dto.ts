import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Assistant } from '../entities';
import { ResponseDoctorDto } from '../../doctor/dto';
import { ResponseUserDto } from '../../users/dto';

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
  @Type(() => ResponseUserDto)
  user: ResponseUserDto;

  constructor(data: Assistant) {
    this.id = data.id;
    this.doctor = new ResponseDoctorDto(data.doctor);
    this.user = new ResponseUserDto(data.user);
  }
}
