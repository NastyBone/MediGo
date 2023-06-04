import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: WelcomeComponent },
      {
        path: 'assistant',
        loadChildren: () =>
          import('../repositories/assistant/assistant.module').then(
            (m) => m.AssistantModule
          ),
      },
      {
        path: 'availability',
        loadChildren: () =>
          import('../repositories/availability/availability.module').then(
            (m) => m.AvailabilityModule
          ),
      },
      {
        path: 'cite',
        loadChildren: () =>
          import('../repositories/cite/cite.module').then((m) => m.CiteModule),
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('../repositories/doctor/doctor.module').then(
            (m) => m.DoctorModule
          ),
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('../repositories/patient/patient.module').then(
            (m) => m.PatientModule
          ),
      },
      {
        path: 'record',
        loadChildren: () =>
          import('../repositories/record/record.module').then(
            (m) => m.RecordModule
          ),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('../repositories/report/report.module').then(
            (m) => m.ReportModule
          ),
      },
      {
        path: 'speciality',
        loadChildren: () =>
          import('../repositories/speciality/speciality.module').then(
            (m) => m.SpecialityModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../repositories/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
