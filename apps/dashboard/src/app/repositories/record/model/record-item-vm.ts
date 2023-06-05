import { RowOptionVM } from '../../../common';
import { RowActionRecord } from './row-action';
import { RecordVM } from './record-vm';
import { PatientVM } from '../../patient/model';
import { DoctorVM } from '../../doctor/model';

export interface RecordItemVM extends RecordVM {
  patient?: PatientVM;
  doctor?: DoctorVM;
  options?: {
    options?: Array<RowOptionVM<RowActionRecord>>;
  };
}
