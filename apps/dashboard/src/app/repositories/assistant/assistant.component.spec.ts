import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantComponent } from './assistant.component';
import { AssistantService, DoctorService, UsersService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AssistantModule } from './assistant.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

describe('AssistantComponent', () => {
  let component: AssistantComponent;
  let fixture: ComponentFixture<AssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssistantComponent],
      providers: [AssistantService, DoctorService, UsersService, HttpClient, HttpHandler],
      imports: [AssistantModule, BrowserAnimationsModule, RouterModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
