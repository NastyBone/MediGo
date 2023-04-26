import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../jwt-auth/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): null | string => {
          const data = request?.cookies['auth-cookie'];
          if (!data) {
            return null;
          }
          return data.token;
        },
      ]),
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
  }): Promise<{ userId: string; username: string }> {
    return { userId: payload.sub, username: payload.email };
  }
}

export interface JwtResult {
  username: string;
  sub: number;
  iat: number;
  exp: number;
}
