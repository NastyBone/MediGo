import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Res,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginDto, LoginUserResponseDto, UserLoginDto } from './login/dto';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout/logout.service';
import { RecoveryPasswordService } from './recovery-password/recovery-password.service';
import {
  RecoveryPasswordDto,
  RecoveryPasswordResponseDto,
} from './recovery-password/dto/recovery-password.dto';
import {
  ChangePasswordDto,
  ChangePasswordResponseDto,
} from './change-password/dto';
import { LoginAuthGuard, Public } from './login';
import { ChangePasswordService } from './change-password/change-password.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly logoutService: LogoutService,
    private readonly recoveryPasswordService: RecoveryPasswordService,
    private readonly changePasswordService: ChangePasswordService,
    private readonly loginService: LoginService
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LoginAuthGuard)
  @ApiResponse({
    type: LoginUserResponseDto,
  })
  login(
    @Body() args: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<LoginUserResponseDto> {
    return this.loginService.login(req['user'] as UserLoginDto, res);
  }

  @Get('logout')
  @ApiResponse({
    type: undefined,
  })
  logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    return this.logoutService.logout(res);
  }

  @Post('recovery-password')
  @Public()
  @ApiResponse({
    type: RecoveryPasswordDto,
  })
  generateRecovery(
    @Body() recoveryPasswordDto: RecoveryPasswordDto
  ): Promise<RecoveryPasswordResponseDto> {
    return this.recoveryPasswordService.generateRecovery(recoveryPasswordDto);
  }

  @Get('recovery-password/:recovery_token')
  @Public()
  @ApiResponse({
    type: RecoveryPasswordResponseDto,
  })
  async getRecoveryById(
    @Param('recovery_token') _token: string
  ): Promise<RecoveryPasswordResponseDto> {
    return await this.recoveryPasswordService.check(_token);
  }

  @Post('recovery-password/:recovery_token')
  @Public()
  @ApiResponse({
    type: RecoveryPasswordResponseDto,
  })
  postRecoveryById(
    @Param('recovery_token') _token: string,
    @Body() body: ChangePasswordDto
  ): Promise<RecoveryPasswordResponseDto> {
    return this.recoveryPasswordService.recovery(_token, body.newPassword);
  }

  @Put('change-password')
  @ApiResponse({
    type: ChangePasswordResponseDto,
  })
  async changePassword(
    @Req() req: Request,
    @Body() body: ChangePasswordDto
  ): Promise<ChangePasswordResponseDto> {
    const token = req.cookies['auth-cookie'].token;

    return await this.changePasswordService.changePassword(
      token,
      body.newPassword
    );
  }
}
