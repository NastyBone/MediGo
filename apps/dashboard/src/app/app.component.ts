import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from './common/state';
import { AlertSocketService } from './common/alert-socket/alert-socket.service';
import { UserStateService } from './common';
import { ToastService } from '@medigo/toast';
import { ResponseCiteDto } from '@medigo/dashboard-sdk';

@Component({
  selector: 'medigo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MediGO';
  loading = true;
  private sub$ = new Subscription();
  constructor(
    private stateService: StateService,
    private cdRef: ChangeDetectorRef,
    private alertSocketService: AlertSocketService,
    private userStateService: UserStateService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.sub$.add(
      this.stateService.getLoading$().subscribe((loading) => {
        this.loading = loading;
        this.cdRef.detectChanges();
      })
    );
    this.sub$.add(
      this.alertSocketService
        .getMessage()
        .subscribe((message: ResponseCiteDto) => {
          this.toastService.info(
            `${message.date} - Cita de ${message.doctor.speciality.name}\n Doctor: ${message.doctor.user.firstName} ${message.doctor.user.firstName}\n Paciente: ${message.patient.user.firstName} ${message.patient.user.firstName}`
          );
        })
    );
    return;
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
