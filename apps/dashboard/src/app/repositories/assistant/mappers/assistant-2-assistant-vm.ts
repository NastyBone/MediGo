/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssistantVM } from '../model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Assistant2AssistantVM(Assistant: any): AssistantVM {
  return {
    id: Assistant.id,
    doctorId: Assistant.doctorId,
    userId: Assistant.userId,
  };
}
