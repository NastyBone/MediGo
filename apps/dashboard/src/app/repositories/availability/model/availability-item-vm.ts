import { RowOptionVM } from '../../../common';
import { RowActionAvailability } from './row-action';
import { AvailabilityVM } from './availability-vm';
import { DoctorVM } from '../../doctor/model';
import { DayVM } from '../days/day-vm';

export interface AvailabilityItemVM extends AvailabilityVM {
  doctor?: DoctorVM;
  day: any;
  options?: {
    options?: Array<RowOptionVM<RowActionAvailability>>;
  };
}
