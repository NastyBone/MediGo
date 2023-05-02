import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../users';
import { RolesGuard, Role } from '../users/users.guard';
import { SettingsDeleteDto, SettingsDto, SettingsResponseDto } from './dto';

@UseGuards(RolesGuard)
@Role(Roles.Admin)
@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiResponse({
    type: SettingsResponseDto,
  })
  getConfig(): Promise<SettingsResponseDto> {
    return this.settingsService.getSettingsResponse();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Role(Roles.Admin)
  @ApiResponse({
    type: SettingsResponseDto,
  })
  uploadConfig(@Body() args: SettingsDto): Promise<SettingsResponseDto> {
    return this.settingsService.updateSettings({
      name: args.name,
      rif: args.rif,
      description: args.description,
      type: args.type,
    });
  }

  @Delete()
  @UseGuards(RolesGuard)
  @Role(Roles.Admin)
  @ApiResponse({
    type: SettingsResponseDto,
  })
  deleteConfig(@Body() args: SettingsDeleteDto): Promise<SettingsResponseDto> {
    return this.settingsService.deleteSettings(args);
  }
}
