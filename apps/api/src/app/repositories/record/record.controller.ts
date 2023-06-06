import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateRecordDto, ResponseRecordDto, UpdateRecordDto } from './dto';
import { RecordService } from './record.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../users';
import { Role, RolesGuard } from '../users/users.guard';
import { ReportsResponseDto } from '../../reports/dto';

@UseGuards(RolesGuard)
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

  @Role(Roles.Admin, Roles.Doctor, Roles.Asistente)
  @Post()
  @ApiResponse({
    type: ResponseRecordDto,
  })
  create(@Body() createDto: CreateRecordDto): Promise<ResponseRecordDto> {
    return this.recordService.insert(createDto);
  }

  @Role(Roles.Admin, Roles.Doctor)
  @Patch(':id')
  @ApiResponse({
    type: ResponseRecordDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateRecordDto
  ): Promise<ResponseRecordDto> {
    return this.recordService.update(id, updateDto);
  }

  // @Role(Roles.Admin, Roles.Asistente, Roles.Doctor)
  @Put('report/:id')
  report(@Param('id', ParseIntPipe) id: number): Promise<ReportsResponseDto> {
    return this.recordService.generate(id);
  }

  @Role(Roles.Admin, Roles.Doctor)
  @Delete(':id')
  @ApiResponse({
    type: ResponseRecordDto,
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseRecordDto> {
    return this.recordService.remove(id);
  }
}
