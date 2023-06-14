import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';
import { Public } from './auth/login';
import { ConfigService } from './config/config.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('public/:name')
  @Public()
  @ApiResponse({
    type: undefined || NotFoundException,
  })
  getAsset(
    @Res() res: Response,
    @Param('name') name: string
  ): Promise<void | NotFoundException> {
    return this.configService.getAsset(res, name);
  }
}
