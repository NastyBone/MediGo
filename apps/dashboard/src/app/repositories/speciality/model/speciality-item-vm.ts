import { RowOptionVM } from '../../../common';
import { RowActionSpeciality } from './row-action';
import { SpecialityVM } from './speciality-vm';

export interface SpecialityItemVM extends SpecialityVM {
  options?: {
    options?: Array<RowOptionVM<RowActionSpeciality>>;
  };
}
