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
import { AssistantService } from './assistant.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateAssistantDto,
  ResponseAssistantDto,
  UpdateAssistantDto,
} from './dto';
import { Roles } from '../users';
import { RolesGuard, Role } from '../users/users.guard';

@UseGuards(RolesGuard)
@Role(Roles.Admin, Roles.Doctor, Roles.Asistente)
@ApiTags('assistant')
@Controller('assistant')
export class AssistantController {
  constructor(private assistantService: AssistantService) {}

  @Get(':id')
  @ApiResponse({
    type: ResponseAssistantDto,
  })
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseAssistantDto> {
    return this.assistantService.findOne(id);
  }

  @Get('user/:id')
  @ApiResponse({
    type: ResponseAssistantDto,
  })
  findByUserId(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseAssistantDto> {
    return this.assistantService.findByUserId(id);
  }

  @Get()
  @ApiResponse({
    type: ResponseAssistantDto,
    isArray: true,
  })
  findAll(): Promise<ResponseAssistantDto[]> {
    return this.assistantService.findAll();
  }

  @Post()
  @ApiResponse({
    type: ResponseAssistantDto,
  })
  create(@Body() createDto: CreateAssistantDto): Promise<ResponseAssistantDto> {
    return this.assistantService.insert(createDto);
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseAssistantDto,
  })
  update(@Param('id', ParseIntPipe) id, @Body() updateDto: UpdateAssistantDto) {
    return this.assistantService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseAssistantDto,
  })
  remove(@Param('id', ParseIntPipe) id) {
    return this.assistantService.remove(id);
  }
}
