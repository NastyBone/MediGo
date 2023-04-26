import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class LogoutService {
  async logout(res: Response): Promise<void> {
    res.cookie('auth-cookie', '', { maxAge: 1 });
    res.send('Ha terminado su sesión correctamente');
    res.redirect('/api');
  }
}
