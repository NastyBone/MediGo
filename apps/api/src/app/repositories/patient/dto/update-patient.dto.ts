import { PartialType } from '@nestjs/mapped-types';
import { CreateSocialProgramDto } from './create-patient.dto';

export class UpdateSocialProgramDto extends PartialType(
  CreateSocialProgramDto
) {}
