import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role, RolesGuard } from '../users/users.guard';
import { Roles } from '../users';

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

}
