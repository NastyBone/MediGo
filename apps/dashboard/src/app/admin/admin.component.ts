import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AssistantService } from '../repositories/assistant/assistant.service';
import { DoctorService } from '../repositories/doctor/doctor.service';
import { PatientService } from '../repositories/patient/patient.service';
import { UserStateService } from '../common';
import { Subscription, take } from 'rxjs';
import { SettingsVM } from '../settings/models';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';
import { SettingsService } from '../settings/settings.service';

export interface NavLink {
  name: string;
  path?: string;
  icon?: string;
  action?: string;
}

export interface BrandInfo {
  name: string;
  logo: string;
  path: string;
  target?: string;
}
@Component({
  selector: 'medigo-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  constructor(
    private doctorsService: DoctorService,
    private assistantService: AssistantService,
    private patientService: PatientService,
    private userStateService: UserStateService,
    private adminSettings: AdminService,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  @Input() brandInfo: BrandInfo = {
    name: 'MediGO',
    logo: '../../assets/logo.png',
    path: '/',
  };

  pageTitle = 'Dashboard';
  closeResult = '';

  sideMenuOptions: NavLink[] = [];

  itemsMenuBasic = [
    {
      name: 'Redes Sociales',
      icon: 'group',
      path: 'social-networks',
    },
    {
      name: 'Programas Sociales',
      icon: 'diversity_3',
      path: 'social-plans',
    },
    {
      name: 'Publicaciones',
      path: 'publications',
      icon: 'collections_bookmark',
    },
  ];

  itemsMenuAdmin = [
    {
      name: 'Configuracion',
      action: 'settings',
      icon: 'settings',
    },
    { name: 'Usuarios', icon: 'person', path: 'users' },
  ];

  logoPath!: string;
  settings: SettingsVM = {
    name: '',
    description: '',
    rif: '123456',
    type: 'default',
  };

  itemMenuLogout = {
    name: 'Cerrar Sesión',
    icon: 'logout',
    action: 'logout',
  };

  sub$ = new Subscription();

  checkRole() {
    const userRole = this.userStateService.getRole();
    const userId = this.userStateService.getUserId() || 0;
    let role: any;
    switch (userRole) {
      case 'doctor': {
        this.sub$.add(
          this.doctorsService
            .findByUserId$(userId)
            .pipe(take(1))
            .subscribe((doctor) => {
              role = doctor;
            })
        );
        break;
      }
      case 'assistant': {
        this.sub$.add(
          this.assistantService
            .findByUserId$(userId)
            .pipe(take(1))
            .subscribe((assistant) => {
              role = assistant;
            })
        );
        break;
      }
      case 'patient': {
        this.sub$.add(
          this.patientService
            .findByUser(userId)
            .pipe(take(1))
            .subscribe((patient) => {
              role = patient;
            })
        );
        break;
      }
      default: {
        console.log('Error');
        break;
      }
    }
    this.userStateService.setRole(role);
  }

  ngOnInit(): void {
    this.checkRole();
    this.sub$.add(this.settingsService.getSettingsData().subscribe());
    this.sub$.add(
      this.settingsService.getSettings$().subscribe((settings) => {
        if (settings) {
          this.settings = {
            ...settings,
          };
        }
      })
    );
    const user = this.userStateService.getUser();
    this.sideMenuOptions = [
      ...this.itemsMenuBasic,
      ...(user?.role === 'admin' ? this.itemsMenuAdmin : []),
      this.itemMenuLogout,
    ]; //TODO: Volver a meter en el if
    if (user) {
      const now = new Date();
      const loginStamp = new Date(user.loginStamp);
      if (loginStamp < now) {
        this.adminSettings.logout();
        this.router.navigate(['/login']);
      }
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  onMenuItemClick(item: NavLink): void {
    switch (item.name) {
      case 'Configuracion':
        this.settingsService.open();
        break;
      case 'Cerrar Sesión':
        this.adminSettings.logout();
        this.router.navigate(['/login']);
        break;
      default:
        this.router.navigate([`/dashboard/${item.path}`]);
        break;
    }
  }
}
