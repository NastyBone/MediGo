import { RowOptionVM } from '../../../common';
import { RowActionAvailability } from './row-action';
import { AvailabilityVM } from './availability-vm';
import { DoctorVM } from '../../doctor/model';

export interface AvailabilityItemVM extends AvailabilityVM {
  doctor: DoctorVM;
  options?: {
    options?: Array<RowOptionVM<RowActionAvailability>>;
  };
}
