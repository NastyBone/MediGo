import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenericReportsDto {
  @ApiProperty()
  @IsString()
  start: string;

  @ApiProperty()
  @IsString()
  end: string;
}
