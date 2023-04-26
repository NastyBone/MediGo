import { Injectable } from '@nestjs/common';
import { UsersService } from '../../repositories/users/users.service';
import { JwtAuthService } from '../jwt-auth/jwtAuth.service';
import { ChangePasswordResponseDto } from './dto';

@Injectable()
export class ChangePasswordService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtAuthService: JwtAuthService
  ) {}
  async changePassword(
    token_: string,
    newPassword_: string
  ): Promise<ChangePasswordResponseDto> {
    const { username: email, sub: id } = await this.jwtAuthService.decode(
      token_
    );
    const response = await this.usersService.changePassword(
      email,
      id,
      newPassword_
    );

    if (response) {
      return { message: 'Contraseña cambiada.' };
    } else {
      return { message: 'Error al cambiar la contraseña.' };
    }
  }
}
