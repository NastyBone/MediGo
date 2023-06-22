import { RowOptionVM } from '../../../common';
import { RowActionCite } from './row-action';
import { CiteVM } from './cite-vm';
import { DoctorVM } from '../../doctor/model';
import { PatientVM } from '../../patient/model';
import { AvailabilityVM } from '../../availability/model';

export interface CiteItemVM extends CiteVM {
  doctor?: DoctorVM;
  patient?: PatientVM;
  time?: AvailabilityVM;
  options?: {
    options?: Array<RowOptionVM<RowActionCite>>;
  };
}
