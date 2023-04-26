import {
  Injectable,
  CanActivate,
  ExecutionContext,
  CustomDecorator,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthService } from '../../auth/jwt-auth/jwtAuth.service';
import { Roles } from './enums';
import { UsersService } from './users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
    private readonly jwtAuthService: JwtAuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { cookies } = context.switchToHttp().getRequest();
    const { username: email } = await this.jwtAuthService.decode(
      cookies['auth-cookie'].token
    );

    const user = await this.usersService.findOneByEmail(email);

    if (!requiredRoles.some((role) => user.role.includes(role))) {
      throw new UnauthorizedException(
        'No está autorizado para realizar esta acción.'
      );
    }
    return true;
  }
}

export const ROLES_KEY = 'roles';
export const Role = (...roles: Roles[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles);
