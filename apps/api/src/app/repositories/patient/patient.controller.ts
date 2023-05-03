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
import { CreatePatientDto, ResponsePatientDto, UpdatePatientDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PatientService } from './patient.service';
import { Role, RolesGuard } from '../users/users.guard';
import { Roles } from '../users';
@UseGuards(RolesGuard)
@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
  @Get('user/:id')
  @ApiResponse({
    type: ResponsePatientDto,
    isArray: true,
  })
  findByUserId(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponsePatientDto> {
    return this.patientService.findByUserId(id);
  }

  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
  @Get(':id')
  @ApiResponse({
    type: ResponsePatientDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponsePatientDto> {
    return this.patientService.findOne(id);
  }

  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
  @Get()
  @ApiResponse({
    type: ResponsePatientDto,
    isArray: true,
  })
  findAll(): Promise<ResponsePatientDto[]> {
    return this.patientService.findAll();
  }

  @Role(Roles.Admin)
  @Post()
  @ApiResponse({
    type: ResponsePatientDto,
  })
  create(@Body() createDto: CreatePatientDto): Promise<ResponsePatientDto> {
    return this.patientService.insert(createDto);
  }

  @Role(Roles.Admin)
  @Patch(':id')
  @ApiResponse({
    type: ResponsePatientDto,
  })
  update(@Param('id', ParseIntPipe) id, @Body() updateDto: UpdatePatientDto) {
    return this.patientService.update(id, updateDto);
  }

  @Role(Roles.Admin)
  @Delete(':id')
  @ApiResponse({
    type: ResponsePatientDto,
  })
  remove(@Param('id', ParseIntPipe) id) {
    return this.patientService.remove(id);
  }
}
