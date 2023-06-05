import { RowOptionVM } from '../../../common';
import { RowActionCite } from './row-action';
import { CiteVM } from './cite-vm';
import { DoctorVM } from '../../doctor/model';
import { PatientVM } from '../../patient/model';

export interface CiteItemVM extends CiteVM {
  doctor?: DoctorVM;
  patient?: PatientVM;
  options?: {
    options?: Array<RowOptionVM<RowActionCite>>;
  };
}
