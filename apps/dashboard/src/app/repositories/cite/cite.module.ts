import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiteRoutingModule } from './cite-routing.module';
import { CiteComponent } from './cite.component';
import { CiteService } from './cite.service';

@NgModule({
  declarations: [CiteComponent],
  imports: [CommonModule, CiteRoutingModule],
  providers: [CiteService],
})
export class CiteModule {}
