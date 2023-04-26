import { OmitType, PartialType } from '@nestjs/swagger';

import { User } from '../entities';

export class CreateUserDto extends PartialType(
  OmitType(User, ['password', 'updatedAt', 'createdAt', 'status', 'deleted'])
) {}
