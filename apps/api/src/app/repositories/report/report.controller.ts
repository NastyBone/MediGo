import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role, RolesGuard } from '../users/users.guard';
import { Roles } from '../users';
import { GetReportDto } from './dto/get-report.dto';

@UseGuards(RolesGuard)
@ApiTags('reports')
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) { }


  @Role(Roles.Admin)
  @Get(':id')
  @ApiResponse({
    type: Object,
  })
  findAll(@Param('id', ParseIntPipe) id: number): Promise<{ completed: number; notCompleted: number }> {
    return this.reportService.findAll(id);
  }

  @Role(Roles.Admin)
  @Post('range')
  @ApiResponse({
    isArray: true
  })
  findByRange(@Body() dateRange: GetReportDto): Promise<{ id: number, name: string, count: string }[]> {
    console.log(dateRange)
    return this.reportService.findBySpecialities(dateRange);
  }


}
