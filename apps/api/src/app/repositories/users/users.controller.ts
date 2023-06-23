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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { hashPassword } from '../../auth/password-hasher/password-hasher';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-entities.dto';
import {
  ResponseUserDto,
  ResponseUserPatientDto,
} from './dto/users-response.dto';
import { Roles } from './enums';
import { Role, RolesGuard } from './users.guard';
import { UsersService } from './users.service';

@UseGuards(RolesGuard)
@Role(Roles.Admin)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/patients')
  @ApiResponse({
    type: ResponseUserPatientDto,
    isArray: true,
  })
  findAllPatients(): Promise<Array<ResponseUserPatientDto>> {
    return this.userService.findUsersPatients();
  }

  @Get('/assistants')
  @ApiResponse({
    type: ResponseUserPatientDto,
    isArray: true,
  })
  findAllAssistants(): Promise<Array<ResponseUserPatientDto>> {
    return this.userService.findAllByAssistantRole();
  }

  @Get('/doctors')
  @ApiResponse({
    type: ResponseUserPatientDto,
    isArray: true,
  })
  findAllDoctors(): Promise<Array<ResponseUserPatientDto>> {
    return this.userService.findAllByDoctorRole();
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseUserDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseUserDto> {
    return this.userService.findOne(id);
  }

  @Get()
  @ApiResponse({
    type: ResponseUserDto,
    isArray: true,
  })
  findAll(): Promise<Array<ResponseUserDto>> {
    return this.userService.findAll();
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseUserDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto
  ): Promise<ResponseUserDto> {
    return this.userService.update(id, updateDto);
  }

  @Post()
  @ApiResponse({
    type: ResponseUserDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<Omit<ResponseUserDto, 'password' | 'updatedAt'>> {
    // Password 10 char length
    const passwordDefault = (
      await hashPassword(Date.now().toString())
    ).substring(0, 10);

    return this.userService.insert(
      createUserDto.email,
      passwordDefault,
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.role
    );
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseUserDto,
  })
  removeUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseUserDto> {
    return this.userService.remove(id);
  }
}
