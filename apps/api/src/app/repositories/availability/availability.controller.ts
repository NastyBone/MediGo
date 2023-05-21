import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateAvailabilityDto,
  ResponseAvailabilityDto,
  UpdateAvailabilityDto,
} from './dto';
import { AvailabilityService } from './availability.service';
import { Roles } from '../users';
import { RolesGuard, Role } from '../users/users.guard';

@UseGuards(RolesGuard)
@ApiTags('availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @Role(Roles.Admin)
  @Get(':id')
  @ApiResponse({
    type: ResponseAvailabilityDto,
  })
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseAvailabilityDto> {
    return this.availabilityService.findOne(id);
  }

  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
  @Get('doctor/:id')
  @ApiResponse({
    type: ResponseAvailabilityDto,
  })
  findByDoctor(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseAvailabilityDto[]> {
    return this.availabilityService.findByDoctor(id);
  }

  @Role(Roles.Admin)
  @Get()
  @ApiResponse({
    type: ResponseAvailabilityDto,
    isArray: true,
  })
  findAll(): Promise<ResponseAvailabilityDto[]> {
    return this.availabilityService.findAll();
  }

  @Role(Roles.Admin, Roles.Doctor)
  @Post()
  @ApiResponse({
    type: ResponseAvailabilityDto,
  })
  create(
    @Body() createDto: CreateAvailabilityDto
  ): Promise<ResponseAvailabilityDto> {
    return this.availabilityService.insert(createDto);
  }

  @Role(Roles.Admin, Roles.Doctor)
  @Patch(':id')
  @ApiResponse({
    type: ResponseAvailabilityDto,
  })
  update(
    @Param('id', ParseIntPipe) id,
    @Body() updateDto: UpdateAvailabilityDto
  ) {
    return this.availabilityService.update(id, updateDto);
  }

  @Role(Roles.Admin, Roles.Doctor)
  @Delete(':id')
  @ApiResponse({
    type: ResponseAvailabilityDto,
  })
  remove(@Param('id', ParseIntPipe) id) {
    return this.availabilityService.remove(id);
  }
}
