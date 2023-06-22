import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from './common/state';
import { AlertSocketService } from './common/alert-socket/alert-socket.service';
import { ToastService } from '@medigo/toast';

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
      this.alertSocketService.getMessage().subscribe((message: any) => {
        this.toastService.info(
          `${new Date(message.data.date).toLocaleDateString('es-ES')} - ${
            message.data.time
          } - Cita de [${message.data.speciality}].\nDoctor: [${
            message.data.doctor.name
          }].\nPaciente: [${message.data.patient.name}]`
        );
      })
    );
    return;
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
