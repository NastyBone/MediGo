import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsersService } from '../../repositories/users/users.service';
import { JwtAuthService } from '../jwt-auth/jwtAuth.service';

import { jwtConstants } from '../jwt-auth/constants';
import { comparePassword } from '../password-hasher/password-hasher';
import { LoginUserResponseDto, UserLoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwtAuthService: JwtAuthService
  ) {}

  async login(
    user: UserLoginDto,
    res: Response
  ): Promise<LoginUserResponseDto> {
    const payload = { username: user.email, sub: user.id };

    const _token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expiresIn,
    });
    const secretData = {
      token: _token,
    };

    const { email, id, role, firstName, lastName, deleted, status } =
      await this.usersService.findOneByEmail(user.email);

    if (deleted || !status)
      throw new BadRequestException(
        'Usted ha sido removido del sistema, hable con el administrador para saber mas'
      );
    const _expiredTime = parseInt(
      (await this.jwtAuthService.decode(_token)).exp + '000'
    );

    res.cookie('auth-cookie', secretData, { httpOnly: true });

    return {
      email,
      id,
      role,
      name: firstName + ' ' + lastName,
      loginStamp: _expiredTime,
    };
  }

  async patientLogin() {
    return; //TODO: Hacer igual que login, pero el role siempre retorna como patient
    //TODO: Poner check o automaticamente redirigir a patientLogin desde login cuando el rol es patient
  }

  async validateUser(email_: string, password_: string): Promise<UserLoginDto> {
    const user = await this.usersService.findOneByEmail(email_);

    if (!user || !(await comparePassword(password_, user.password))) {
      throw new UnauthorizedException('Usuario o contraseña inválida.');
    }

    return { email: user.email, id: user.id };
  }
}
