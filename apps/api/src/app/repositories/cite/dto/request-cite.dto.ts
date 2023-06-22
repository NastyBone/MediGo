import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequestCiteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: string;
}
