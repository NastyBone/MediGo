import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { Role, RolesGuard } from '../users/users.guard';
import { Roles } from '../users';

@UseGuards(RolesGuard)
@ApiTags('reports')
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  // @Role(Roles.Admin)
  // @Get()
  // @ApiResponse({
  //   type: Any,
  // })
  // findAll(): Promise<{ completed: number; notCompleted: number }> {
  //   return this.reportService.findAll();
  // }

  // @Role(Roles.Admin, Roles.Asistente, Roles.Doctor)
  // @Get()
  // @ApiResponse({
  //   type: Any,
  // })
  // findByDoctor(
  //   @Param('id', ParseIntPipe) id
  // ): Promise<{ completed: number; notCompleted: number }> {
  //   return this.reportService.findByDoctor(id);
  // }
}
