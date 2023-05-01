import { PartialType } from '@nestjs/swagger';

import { CreateSpecialityDto } from './create-specialitydto';

export class UpdateSpecialityDto extends PartialType(CreateSpecialityDto) {}
