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
    icon: 'group_add',
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
    icon: 'medical_services',
    path: 'doctor',
  },
  {
    name: 'Disponibilidad',
    icon: 'pending_actions',
    path: 'availability',
  },
  {
    name: 'Especialidades',
    icon: 'medical_information',
    path: 'speciality',
  },
  {
    name: 'Informes',
    icon: 'assignment_ind',
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
    icon: 'insert_invitation',
    path: 'cite',
  },
  {
    name: 'Disponibilidad',
    icon: 'pending_actions',
    path: 'availability',
  },
  {
    name: 'Informes',
    icon: 'assignment_ind',
    path: 'record',
  },
];
export const assistantOptions: menuOptions[] = [
  {
    name: 'Citas',
    icon: 'insert_invitation',
    path: 'cite',
  },
  {
    name: 'Disponibilidad',
    icon: 'pending_actions',
    path: 'availability',
  },
  {
    name: 'Informes',
    icon: 'assignment_ind',
    path: 'record',
  },
];
export const patientOptions: menuOptions[] = [
  {
    name: 'Citas',
    icon: 'insert_invitation',
    path: 'cite',
  },
  {
    name: 'Informes',
    icon: 'assignment_ind',
    path: 'record',
  },
];
