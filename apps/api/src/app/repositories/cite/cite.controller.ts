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
import { CreateCiteDto, ResponseCiteDto, UpdateCiteDto } from './dto';
import { CiteService } from './cite.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../users';
import { RolesGuard, Role } from '../users/users.guard';
import { RequestCiteDto } from './dto/request-cite.dto';

@UseGuards(RolesGuard)
@ApiTags('cite')
@Controller('cite')
export class CiteController {
  constructor(private citeService: CiteService) {}

  @Role(Roles.Admin, Roles.Paciente)
  @Get('patient/:id')
  @ApiResponse({
    type: ResponseCiteDto,
    isArray: true,
  })
  findByPatient(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseCiteDto[]> {
    return this.citeService.findByPatient(id);
  }

  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor)
  @Get('doctor/:id')
  @ApiResponse({
    type: ResponseCiteDto,
    isArray: true,
  })
  findByDoctor(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseCiteDto[]> {
    return this.citeService.findByDoctor(id);
  }

  @Role(Roles.Admin, Roles.Paciente, Roles.Asistente, Roles.Doctor)
  @Get(':id')
  @ApiResponse({
    type: ResponseCiteDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseCiteDto> {
    return this.citeService.findOne(id);
  }

  @Role(Roles.Admin)
  @Get()
  @ApiResponse({
    type: ResponseCiteDto,
    isArray: true,
  })
  findAll(): Promise<ResponseCiteDto[]> {
    return this.citeService.findAll();
  }

  @Role(Roles.Admin, Roles.Doctor, Roles.Paciente)
  @Post()
  @ApiResponse({
    type: ResponseCiteDto,
  })
  create(@Body() createDto: CreateCiteDto): Promise<ResponseCiteDto> {
    return this.citeService.insert(createDto);
  }

  @Role(Roles.Admin, Roles.Paciente, Roles.Asistente, Roles.Doctor)
  @Post('date/:id')
  @ApiResponse({
    type: ResponseCiteDto,
    isArray: true,
  })
  findByDoctorAndDate(
    @Body() objectDate: RequestCiteDto,
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseCiteDto[]> {
    return this.citeService.findByDoctorAndDate(id, objectDate);
  }

  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
  @Patch(':id')
  @ApiResponse({
    type: ResponseCiteDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCiteDto
  ): Promise<ResponseCiteDto> {
    return this.citeService.update(id, updateDto);
  }

  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
  @Delete(':id')
  @ApiResponse({
    type: ResponseCiteDto,
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseCiteDto> {
    return this.citeService.remove(id);
  }
}
