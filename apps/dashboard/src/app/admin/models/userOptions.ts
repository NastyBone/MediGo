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
    icon: 'wc',
    path: 'assistant',
  },
  {
    name: 'Citas',
    icon: 'insert_invitation',
    path: 'cite',
  },
  {
    name: 'Configuracion',
    action: 'settings',
    icon: 'settings',
  },
  {
    name: 'Doctores',
    icon: 'group',
    path: 'doctor',
  },
  {
    name: 'Disponibilidad',
    icon: 'diversity_3',
    path: 'availability',
  },
  {
    name: 'Especialidades',
    icon: 'account_box',
    path: 'speciality',
  },
  {
    name: 'Informes',
    icon: 'folder',
    path: 'record',
  },
  {
    name: 'Pacientes',
    icon: 'supervised_user_circle',
    path: 'patient',
  },
  {
    name: 'Reporte',
    icon: 'assignment',
    path: 'report',
  },
  {
    name: 'Usuarios',
    icon: 'perm_identity',
    path: 'users',
  },
];
export const doctorOptions: menuOptions[] = [
  {
    name: 'Citas',
    icon: 'diversity_3',
    path: 'Cite',
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
    path: 'Cite',
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
    path: 'Cite',
  },
  {
    name: 'Informes',
    icon: 'diversity_3',
    path: 'record',
  },
];
