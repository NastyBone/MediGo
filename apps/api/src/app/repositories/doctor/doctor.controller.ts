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
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, ResponseDoctorDto, UpdateDoctorDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role, RolesGuard } from '../users/users.guard';
import { Roles } from '../users';

@UseGuards(RolesGuard)
@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
  @Get('user/:id')
  @ApiResponse({
    type: ResponseDoctorDto,
    isArray: true,
  })
  findByUserId(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseDoctorDto> {
    return this.doctorService.findByUserId(id);
  }

  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
  @Get('speciality/:id')
  @ApiResponse({
    type: ResponseDoctorDto,
    isArray: true,
  })
  findBySpecialityId(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseDoctorDto[]> {
    return this.doctorService.findBySpeciality(id);
  }

  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
  @Get(':id')
  @ApiResponse({
    type: ResponseDoctorDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseDoctorDto> {
    return this.doctorService.findOne(id);
  }

  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
  @Get()
  @ApiResponse({
    type: ResponseDoctorDto,
    isArray: true,
  })
  findAll(): Promise<ResponseDoctorDto[]> {
    return this.doctorService.findAll();
  }

  @Role(Roles.Admin)
  @Post()
  @ApiResponse({
    type: ResponseDoctorDto,
  })
  create(@Body() createDto: CreateDoctorDto): Promise<ResponseDoctorDto> {
    return this.doctorService.insert(createDto);
  }

  @Role(Roles.Admin)
  @Patch(':id')
  @ApiResponse({
    type: ResponseDoctorDto,
  })
  update(@Param('id', ParseIntPipe) id, @Body() updateDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDto);
  }

  @Role(Roles.Admin)
  @Delete(':id')
  @ApiResponse({
    type: ResponseDoctorDto,
  })
  remove(@Param('id', ParseIntPipe) id) {
    return this.doctorService.remove(id);
  }
}
