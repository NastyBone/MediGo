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
import { SpecialityService } from './speciality.service';
import {
  CreateSpecialityDto,
  ResponseSpecialityDto,
  UpdateSpecialityDto,
} from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../users';
import { RolesGuard, Role } from '../users/users.guard';

@UseGuards(RolesGuard)
@ApiTags('speciality')
@Controller('speciality')
export class SpecialityController {
  constructor(private specialityService: SpecialityService) { }

  @Role(Roles.Admin)
  @Get(':id')
  @ApiResponse({
    type: ResponseSpecialityDto,
  })
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseSpecialityDto> {
    return this.specialityService.findOne(id);
  }

  @Role(Roles.Admin, Roles.Paciente)
  @Get()
  @ApiResponse({
    type: ResponseSpecialityDto,
    isArray: true,
  })
  findAll(): Promise<ResponseSpecialityDto[]> {
    return this.specialityService.findAll();
  }

  @Role(Roles.Admin)
  @Post()
  @ApiResponse({
    type: ResponseSpecialityDto,
  })
  create(
    @Body() createDto: CreateSpecialityDto
  ): Promise<ResponseSpecialityDto> {
    return this.specialityService.insert(createDto);
  }

  @Role(Roles.Admin)
  @Patch(':id')
  @ApiResponse({
    type: ResponseSpecialityDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSpecialityDto
  ): Promise<ResponseSpecialityDto> {
    return this.specialityService.update(id, updateDto);
  }

  @Role(Roles.Admin)
  @Delete(':id')
  @ApiResponse({
    type: ResponseSpecialityDto,
  })
  @Role(Roles.Admin)
  remove(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseSpecialityDto> {
    return this.specialityService.remove(id);
  }
}
