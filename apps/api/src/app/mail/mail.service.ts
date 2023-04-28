import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { recovery, welcome } from './templates/templates';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  /**
   * Funcion para mandar un correo con el token `url_` de recuperacion al `email_` especificado.
   * @param url_ - Url token para recuperar la contraseña
   * @param email_ - El email al que se enviara el url
   * @returns Un boolean indicando el exito o fracaso al enviar el correo
   */
  async sendRecovery(url_: string, email_: string): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: email_,
        subject: 'MEDIGO - Solicitud de cambio de contraseña',
        html: recovery(url_),
        attachments: [
          {
            filename: 'brand-no-background.png',
            path:
              process.cwd() +
              '/packages/api/src/assets/brand-no-background.png',
            cid: 'filesrc',
          },
        ],
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  async sendWelcome(
    email_: string,
    user_: string,
    password_: string,
    role_: string
  ): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: email_,
        subject:
          'MEDIGO - Bienvenido al sistema de gestión operativa de TECNO DIESEL SERVICIOS',
        html: welcome(
          email_,
          user_,
          password_,
          role_,
          'http://localhost:4200/login'
        ),
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
