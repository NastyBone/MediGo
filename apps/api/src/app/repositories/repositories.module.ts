import { Module } from '@nestjs/common';

import { UsersModule } from './users';
import { AssistantModule } from './assistant/assistant.module';
import { SettingsModule } from './settings/settings.module';
import { CiteModule } from './cite/cite.module';
import { DoctorModule } from './doctor/doctor.module';
import { SpecialityModule } from './speciality/speciality.module';
import { AvailabilityModule } from './availability/availability.module';
import { PatientModule } from './patient/patient.module';
import { RecordModule } from './record/record.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    UsersModule,
    AssistantModule,
    SettingsModule,
    CiteModule,
    DoctorModule,
    SpecialityModule,
    AvailabilityModule,
    PatientModule,
    RecordModule,
    ReportModule,
  ],
  providers: [],
  controllers: [],
})
export class RepositoriesModule {}
