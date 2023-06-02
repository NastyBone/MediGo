import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordRoutingModule } from './record-routing.module';
import { RecordComponent } from './record.component';
import { RecordService } from './record.service';

@NgModule({
  declarations: [RecordComponent],
  imports: [CommonModule, RecordRoutingModule],
  providers: [RecordService],
})
export class RecordModule {}
