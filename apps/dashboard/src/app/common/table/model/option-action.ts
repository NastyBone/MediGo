import { RowOptionVM } from './row-option-vm';

export interface OptionAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: RowOptionVM<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: string };
}
