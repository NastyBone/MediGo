import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export enum ErrorSource {
  Client = 'CLIENT',
  Server = 'SERVER',
}

export interface CustomError extends Error {
  path: string;
  statusCode: number;
  /** Código interno de la aplicación */
  code?: string;
  timestamp: Date;
  /** Provee más detalles del error,( Traducido) */
  description?: string;
}

export interface ParsedError {
  source: ErrorSource;
  error: any;
  message?: string;
}

/**
 * Da formato a los errores dependiendo de su origen (Cliente / servidor)
 */
@Injectable()
export class ErrorParserService {
  constructor() {}

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error?.message ? error?.message : error?.toString();
  }

  getServerMessage(error: CustomError): string {
    let message = 'UNKNOW_SERVER_ERROR';
    if (error.code || error.statusCode) {
      message = error.description || error.message || message;
    }
    return message;
  }

  /**
   * Indica la fuente del error: HTTP ó una acción del
   * lado del cliente
   */
  getErrorAndSource(error: any): ParsedError {
    let source = ErrorSource.Client;
    let unwrappedError = error;
    let message = error?.message;
    if (error instanceof HttpErrorResponse) {
      source = ErrorSource.Server;
      unwrappedError = error.error;
      message = this.getServerMessage(unwrappedError);
    } else if (error?.rejection instanceof HttpErrorResponse) {
      source = ErrorSource.Server;
      unwrappedError = error?.rejection?.error;
      message = this.getClientMessage(unwrappedError);
    }
    return {
      source,
      error: unwrappedError,
    };
  }

  getMessage(error: Error | HttpErrorResponse): string {
    const { source, error: ex } = this.getErrorAndSource(error);
    const parsedError =
      ErrorSource.Server === source
        ? this.getServerMessage(ex)
        : this.getClientMessage(ex);
    return parsedError || error?.message;
  }
}
