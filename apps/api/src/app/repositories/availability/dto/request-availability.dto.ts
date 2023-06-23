import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequestAvailabilityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: string;
}
