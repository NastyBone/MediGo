import { PartialType } from '@nestjs/swagger';

import { CreatePublicationDto } from './create-assistant.dto';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {}
