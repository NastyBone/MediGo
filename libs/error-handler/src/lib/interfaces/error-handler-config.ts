import { Type } from '@angular/core';

import { LoggerConfig } from '@medigo/logger';

export interface ErrorHandlerConfig<T = any> {
  /**
   * Clase que se utiliza en la aplicación para presentar notificaciones de alerta,
   * por ejemplo, un servicio que presente notificaciones de Toast. si no se especifíca,
   * se utiliza por defecto `window.alert`.
   */
  alertService?: Type<T>;
  /**
   * Nombre del métodeo en `alertService` que debe ser ejecutado para presentar la alerta,
   *
   * __Ejemplo:__
   * Si el servicio utiliza el método `showError`
   * ```typescript
   * this.toastService.showError(error);
   * ```
   *
   * el valor de `alertMethod` debe ser `showError`
   */
  alertMethodName?: string;
  /**
   * Configuración del servicio de logging
   */
  loggerConfig?: LoggerConfig;
  /** Indica si los errores generados en el cliente se deben presentar en el servicio de alertas */
  alertClientErrors?: boolean;
}
