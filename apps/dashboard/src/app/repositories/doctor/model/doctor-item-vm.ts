import { RowOptionVM } from '../../../common';
import { RowActionDoctor } from './row-action';
import { DoctorVM } from './doctor-vm';
import { UserVM } from '../../users/model';
import { SpecialityVM } from '../../speciality/model';

export interface DoctorItemVM extends DoctorVM {
  user: UserVM;
  speciality: SpecialityVM;
  options?: {
    options?: Array<RowOptionVM<RowActionDoctor>>;
  };
}
