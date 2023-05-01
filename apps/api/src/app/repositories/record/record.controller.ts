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
import { CreateRecordDto, ResponseRecordDto, UpdateRecordDto } from './dto';
import { RecordService } from './record.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../users';
import { Role, RolesGuard } from '../users/users.guard';

@UseGuards(RolesGuard)
@Role(Roles.Admin, Roles.Asistente, Roles.Doctor, Roles.Paciente)
@ApiTags('record')
@Controller('record')
export class RecordController {
  constructor(private recordService: RecordService) {}

  @Role(Roles.Admin, Roles.Paciente)
  @Get('patient/:id')
  @ApiResponse({
    type: ResponseRecordDto,
    isArray: true,
  })
  findByPatient(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseRecordDto[]> {
    return this.recordService.findByPatient(id);
  }

  @Role(Roles.Admin, Roles.Asistente, Roles.Doctor)
  @Get('doctor/:id')
  @ApiResponse({
    type: ResponseRecordDto,
    isArray: true,
  })
  findByDoctor(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseRecordDto[]> {
    return this.recordService.findByPatient(id);
  }

  @Role(Roles.Admin)
  @Get(':id')
  @ApiResponse({
    type: ResponseRecordDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseRecordDto> {
    return this.recordService.findOne(id);
  }

  @Role(Roles.Admin)
  @Get()
  @ApiResponse({
    type: ResponseRecordDto,
    isArray: true,
  })
  findAll(): Promise<ResponseRecordDto[]> {
    return this.recordService.findAll();
  }

  @Role(Roles.Admin)
  @Post()
  @ApiResponse({
    type: ResponseRecordDto,
  })
  create(@Body() createDto: CreateRecordDto): Promise<ResponseRecordDto> {
    return this.recordService.insert(createDto);
  }

  @Role(Roles.Admin)
  @Patch(':id')
  @ApiResponse({
    type: ResponseRecordDto,
  })
  update(@Param('id', ParseIntPipe) id, @Body() updateDto: UpdateRecordDto) {
    return this.recordService.update(id, updateDto);
  }

  @Role(Roles.Admin)
  @Delete('id')
  @ApiResponse({
    type: ResponseRecordDto,
  })
  remove(@Param('id', ParseIntPipe) id) {
    return this.recordService.remove(id);
  }
}
