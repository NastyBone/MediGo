import { RowOptionVM } from '../../../common';
import { RowActionPatient } from './row-action';
import { PatientVM } from './patient-vm';
import { UserVM } from '../../users/model';

export interface PatientItemVM extends PatientVM {
  user?: UserVM;
  options?: {
    options?: Array<RowOptionVM<RowActionPatient>>;
  };
}
