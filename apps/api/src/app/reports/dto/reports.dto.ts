import { ApiProperty } from '@nestjs/swagger';
export class ReportsDto<T> {
  @ApiProperty()
  data: T;
}
