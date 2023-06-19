import { menuOptions } from './menuOptions.interface';

export const userSettings: menuOptions[] = [
  {
    name: 'Cerrar sesión',
    icon: 'logout',
    action: 'logout',
  },
];

export const adminOptions: menuOptions[] = [
  {
    name: 'Asistentes',
    icon: 'diversity_3',
    path: 'assistant',
  },
  {
    name: 'Citas',
    icon: 'diversity_3',
    path: 'cite',
  },
  {
    name: 'Configuracion',
    action: 'settings',
    icon: 'settings',
  },
  {
    name: 'Doctores',
    icon: 'diversity_3',
    path: 'doctor',
  },
  {
    name: 'Disponibilidad',
    icon: 'diversity_3',
    path: 'availability',
  },
  {
    name: 'Especialidades',
    icon: 'diversity_3',
    path: 'speciality',
  },
  {
    name: 'Informes',
    icon: 'diversity_3',
    path: 'record',
  },
  {
    name: 'Pacientes',
    icon: 'diversity_3',
    path: 'patient',
  },
  {
    name: 'Reporte',
    icon: 'diversity_3',
    path: 'report',
  },
  {
    name: 'Usuarios',
    icon: 'diversity_3',
    path: 'users',
  },
];
export const doctorOptions: menuOptions[] = [
  {
    name: 'Citas',
    icon: 'diversity_3',
    path: 'cite',
  },
  {
    name: 'Disponibilidad',
    icon: 'diversity_3',
    path: 'availability',
  },
  {
    name: 'Informes',
    icon: 'diversity_3',
    path: 'record',
  },
];
export const assistantOptions: menuOptions[] = [
  {
    name: 'Citas',
    icon: 'diversity_3',
    path: 'cite',
  },
  {
    name: 'Disponibilidad',
    icon: 'diversity_3',
    path: 'availability',
  },
  {
    name: 'Informes',
    icon: 'diversity_3',
    path: 'record',
  },
];
export const patientOptions: menuOptions[] = [
  {
    name: 'Citas',
    icon: 'diversity_3',
    path: 'cite',
  },
  {
    name: 'Informes',
    icon: 'diversity_3',
    path: 'record',
  },
];
