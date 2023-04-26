import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { jwtConstants } from './constants';
import { JwtResult } from '../strategies';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  /**
   * Decodifica un token de JWT y obtiene el email (username) y el userId (sub);
   * @param token_ - Token para ser decodificado
   * @returns
   */
  async decode(token_: string): Promise<JwtResult> {
    try {
      return await this.jwtService.verifyAsync(token_, {
        secret: jwtConstants.secret,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new BadRequestException('Ha expirado el tiempo del token');
      } else if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('No es un token valido');
      } else {
        // Cualquier otro error
        console.log(error);
        throw new BadRequestException('Ha ocurrido un error: ' + error.stack);
      }
    }
  }
}
