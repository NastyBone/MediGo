/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssistantVM } from '../model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Assistant2AssistantVM(Assistant: any): AssistantVM {
  try {
    if (!Assistant) throw Error();
  } catch (e) {
    throw new Error('Usuario no ha sido asignado como asistente');
  }
  return {
    id: Assistant.id,
    doctorId: Assistant.doctor.id,
    userId: Assistant.user.id,
  };
}
