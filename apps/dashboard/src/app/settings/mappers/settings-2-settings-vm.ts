// eslint-disable-next-line @typescript-eslint/no-unused-vars, @nrwl/nx/enforce-module-boundaries

import { SettingsResponseDto } from '@medigo/dashboard-sdk';
import { SettingsVM } from '../models';

export function Settings2SettingsVM(settings: SettingsResponseDto): SettingsVM {
  return {
    name: settings.name,
    rif: settings.rif,
    type: settings.type,
    description: settings.description,
    userId: settings.userId,
  };
}
