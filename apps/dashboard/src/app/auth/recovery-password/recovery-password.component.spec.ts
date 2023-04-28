import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@tecnops/dashboard-sdk';
import { AuthModule } from '../auth.module';

import { RecoveryPasswordComponent } from './recovery-password.component';
import { RecoveryPasswordService } from './recovery-password.service';

describe('RecoveryPasswordComponent', () => {
  let component: RecoveryPasswordComponent;
  let fixture: ComponentFixture<RecoveryPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoveryPasswordComponent],
      providers: [
        RecoveryPasswordService,
        AuthService,
        HttpClient,
        HttpHandler,
      ],
      imports: [AuthModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
