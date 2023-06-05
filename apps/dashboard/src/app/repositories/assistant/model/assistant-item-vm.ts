import { RowOptionVM } from '../../../common';
import { DoctorVM } from '../../doctor/model';
import { UserVM } from '../../users/model';
import { AssistantVM } from './assistant-vm';
import { RowActionAssistant } from './row-action';

export interface AssistantItemVM extends AssistantVM {
  user?: UserVM;
  doctor?: DoctorVM;
  options?: {
    options?: Array<RowOptionVM<RowActionAssistant>>;
  };
}
