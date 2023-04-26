import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['id'])
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status?: boolean;
}
