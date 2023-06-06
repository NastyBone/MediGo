import { Settings } from '../entities';

export class InternalSettingsResponse {
  name: string;
  rif: string;
  description: string;
  type: string;
  userId: number;

  constructor(_data: Settings[]) {
    this.name = _data.find((x) => x.id == 'name')?.value || 'MediGO';

    const _rif = _data.find((x) => x.id == 'rif')?.value;
    if (_rif !== 'null' && _rif !== null) {
      this.rif = _rif;
    }

    const _description = _data.find((x) => x.id == 'description')?.value;
    if (_description !== 'null' && _description !== null) {
      this.description = _description;
    }

    const _type = _data.find((x) => x.id == 'type')?.value;
    if (_type !== 'null' && _type !== null) {
      this.type = _type;
    }

    const _userId = _data.find((x) => x.id == 'userId')?.value;
    if (_userId !== 'null' && _userId !== null) {
      this.userId = +_userId;
    }
  }
}
