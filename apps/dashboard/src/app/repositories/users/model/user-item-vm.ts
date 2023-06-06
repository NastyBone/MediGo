import { RowOptionVM } from '../../../common';

import { RowActionUser } from './row-action';
import { UserVM } from './users-vm';

export interface UserItemVM extends UserVM {
  options?: {
    options?: Array<RowOptionVM<RowActionUser>>;
  };
}
