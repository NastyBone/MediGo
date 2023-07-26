import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsDateString } from "class-validator";

export class GetReportDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  start!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  end!: string;
}
