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
import { RequestAvailabilityDto } from './dto/request-availability.dto';

@ApiTags('availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @UseGuards(RolesGuard)
  @Role(Roles.Admin, Roles.Doctor)
  @Get(':id')
  @ApiResponse({
    type: ResponseAvailabilityDto,
  })
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseAvailabilityDto> {
    return this.availabilityService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
  @Get('doctor/:id')
  @ApiResponse({
    type: ResponseAvailabilityDto,
    isArray: true,
  })
  findByDoctor(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseAvailabilityDto[]> {
    return this.availabilityService.findByDoctor(id);
  }

  @UseGuards(RolesGuard)
  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
  @Post('day/:id')
  @ApiResponse({
    type: ResponseAvailabilityDto,
    isArray: true,
  })
  findByDay(
    @Param('id', ParseIntPipe) id: number,
    @Body() dayOfWeek: RequestAvailabilityDto
  ): Promise<ResponseAvailabilityDto[]> {
    return this.availabilityService.findByDayOfWeek(dayOfWeek.date, id);
  }

  @UseGuards(RolesGuard)
  @Role(Roles.Admin)
  @Get()
  @ApiResponse({
    type: ResponseAvailabilityDto,
    isArray: true,
  })
  findAll(): Promise<ResponseAvailabilityDto[]> {
    return this.availabilityService.findAll();
  }

  @UseGuards(RolesGuard)
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

  @UseGuards(RolesGuard)
  @Role(Roles.Admin, Roles.Doctor)
  @Patch(':id')
  @ApiResponse({
    type: ResponseAvailabilityDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAvailabilityDto
  ): Promise<ResponseAvailabilityDto> {
    return this.availabilityService.update(id, updateDto);
  }

  @UseGuards(RolesGuard)
  @Role(Roles.Admin, Roles.Doctor)
  @Delete(':id')
  @ApiResponse({
    type: ResponseAvailabilityDto,
  })
  remove(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseAvailabilityDto> {
    return this.availabilityService.remove(id);
  }
}
