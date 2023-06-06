import { RowOptionVM } from '../../../common';
import { RowActionUser } from './row-action';

export interface UserVM {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  role: string;
  options?: {
    options?: Array<RowOptionVM<RowActionUser>>;
  };
}
