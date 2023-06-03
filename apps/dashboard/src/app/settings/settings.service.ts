import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { SettingsSave, SettingsVM } from './models';
import { GetSettingsService } from './use-cases/get-settings/get-settings.service';
import { UpdateSettingssService } from './use-cases/update-settings/update-settings.service';
import { SettingsComponent } from './settings.component';

@Injectable()
export class SettingsService {
  private settings$ = new BehaviorSubject<SettingsVM>({
    name: 'MEDIGO',
    description: 'Sistema para la gestión médica',
    rif: 'J0000000000',
    type: 'default',
  });
  protected loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private dialog: MatDialog,
    private getSettingsService: GetSettingsService,
    private updateSettingsService: UpdateSettingssService
  ) {}

  getLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  setLoading(load: boolean): void {
    this.loading$.next(load);
  }

  open(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {
      hasBackdrop: true,
      disableClose: true,
    });

    // (dialogRef.componentInstance as SettingsComponent).closed.subscribe(
    //   () => {
    //     dialogRef.close();
    //   }
    // ); //TODO: Implementar
  }

  setConfigData(data: SettingsSave): Observable<SettingsVM> {
    this.setLoading(true);

    return this.updateSettingsService.exec(data).pipe(
      tap((settings) => {
        this.settings$.next(settings);
      }),
      finalize(() => this.setLoading(true))
    );
  }

  getSettingsData(): Observable<SettingsVM> {
    this.setLoading(true);
    return this.getSettingsService.exec().pipe(
      tap((settings) => this.settings$.next(settings)),
      finalize(() => this.setLoading(true))
    );
  }
  getSettings$(): Observable<SettingsVM> {
    return this.settings$.asObservable();
  }
}
