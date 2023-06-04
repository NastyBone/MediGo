import { Injectable } from '@angular/core';

@Injectable()
export class AlertServiceService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  error(msg: string): void {
    window.alert(msg);
  }
}
