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
@ApiTags('assistant')
@Controller('assistant')
export class AssistantController {
  constructor(private assistantService: AssistantService) {}

  @Role(Roles.Admin)
  @Get(':id')
  @ApiResponse({
    type: ResponseAssistantDto,
  })
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseAssistantDto> {
    return this.assistantService.findOne(id);
  }
  @Role(Roles.Admin, Roles.Asistente)
  @Get('user/:id')
  @ApiResponse({
    type: ResponseAssistantDto,
  })
  findByUserId(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseAssistantDto> {
    return this.assistantService.findByUserId(id);
  }

  @Role(Roles.Admin)
  @Get()
  @ApiResponse({
    type: ResponseAssistantDto,
    isArray: true,
  })
  findAll(): Promise<ResponseAssistantDto[]> {
    return this.assistantService.findAll();
  }
  @Role(Roles.Admin)
  @Post()
  @ApiResponse({
    type: ResponseAssistantDto,
  })
  create(@Body() createDto: CreateAssistantDto): Promise<ResponseAssistantDto> {
    return this.assistantService.insert(createDto);
  }

  @Role(Roles.Admin)
  @Patch(':id')
  @ApiResponse({
    type: ResponseAssistantDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAssistantDto
  ): Promise<ResponseAssistantDto> {
    return this.assistantService.update(id, updateDto);
  }
  @Role(Roles.Admin)
  @Delete(':id')
  @ApiResponse({
    type: ResponseAssistantDto,
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseAssistantDto> {
    return this.assistantService.remove(id);
  }
}
