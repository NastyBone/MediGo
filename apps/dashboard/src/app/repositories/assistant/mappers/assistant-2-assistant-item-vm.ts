/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowActionAssistant, AssistantItemVM } from '../model';
import { Assistant2AssistantVM } from './assistant-2-assistant-vm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AssistantItem2AssistantItemVM(Assistant: any): AssistantItemVM {
  return {
    ...Assistant2AssistantVM(Assistant),
    doctor: Assistant.doctor,
    user: Assistant.user,
    options: {
      options: [
        {
          name: 'Editar',
          value: RowActionAssistant.update,
        },
        {
          name: 'Eliminar',
          value: RowActionAssistant.delete,
        },
      ],
    },
  };
}
