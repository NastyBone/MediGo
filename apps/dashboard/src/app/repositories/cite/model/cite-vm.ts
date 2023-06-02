export interface CiteVM {
  id?: number;
  subject: string;
  date: string | Date;
  time: string;
  patientConfirm: boolean;
  doctorId: number;
  patientId: number;
}
