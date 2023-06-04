import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

import { LoggerConfig, LoggerConfigKey } from './interfaces';

/**
 * Servicio centralizaco para mantener la observabilidad de los datos del
 * sistema, errores, logs, analíticas, etc, se utiliza para informar los reportes
 * de error a la plataforma administrativa del sistema
 *
 */

@Injectable()
export class LoggerService {
  constructor(
    private httpClient: HttpClient,
    @Optional()
    @Inject(LoggerConfigKey)
    private config: LoggerConfig = {
      allowConsole: true,
      allowRemoteLogging: false,
    }
  ) {}

  /**
   * Reporta errores a la plataforma
   * TODO: Crear un API res para el reporte de errores
   * @param error Error a Enviar
   */
  reportError(error: Error, config: LoggerConfig = {}): void {
    config = {
      ...this.config,
      ...config,
    };
    if (config?.allowConsole) {
      console.error(error);
    }

    if (config?.allowRemoteLogging) {
      this.httpClient.post<any>(config?.remoteURL || '', error).subscribe();
    }
  }
}
