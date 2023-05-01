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
@Role(Roles.Admin)
@ApiTags('speciality')
@Controller('speciality')
export class SpecialityController {
  constructor(private specialityService: SpecialityService) {}

  @Get(':id')
  @ApiResponse({
    type: ResponseSpecialityDto,
  })
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseSpecialityDto> {
    return this.specialityService.findOne(id);
  }

  @Get()
  @ApiResponse({
    type: ResponseSpecialityDto,
    isArray: true,
  })
  findAll(): Promise<ResponseSpecialityDto[]> {
    return this.specialityService.findAll();
  }

  @Post()
  @ApiResponse({
    type: ResponseSpecialityDto,
  })
  create(
    @Body() createDto: CreateSpecialityDto
  ): Promise<ResponseSpecialityDto> {
    return this.specialityService.insert(createDto);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseSpecialityDto,
  })
  update(
    @Param('id', ParseIntPipe) id,
    @Body() updateDto: UpdateSpecialityDto
  ) {
    return this.specialityService.update(id, updateDto);
  }

  @Delete('id')
  @ApiResponse({
    type: ResponseSpecialityDto,
  })
  remove(@Param('id', ParseIntPipe) id) {
    return this.specialityService.remove(id);
  }
}
