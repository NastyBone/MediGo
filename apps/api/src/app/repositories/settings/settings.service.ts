import { BadRequestException, Injectable } from '@nestjs/common';
import { Settings } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalSettingsResponse } from './dto/internal-settings-response.dto';
import { SettingsDeleteDto, SettingsDto, SettingsResponseDto } from './dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>
  ) {}

  async getAllSettings(): Promise<InternalSettingsResponse> {
    return new InternalSettingsResponse(await this.settingsRepository.find());
  }

  async getSettingsResponse(): Promise<SettingsResponseDto> {
    return new SettingsResponseDto(await this.getAllSettings());
  }

  async updateSettings(setting: SettingsDto): Promise<SettingsResponseDto> {
    const settings: Settings[] = [];

    if (setting.name) {
      if (!this.checkIfValid(setting.name)) {
        throw new BadRequestException(
          'El nombre no puede contener caracteres especiales'
        );
      }

      settings.push(
        this.settingsRepository.create({
          id: 'name',
          value: setting.name,
        })
      );
    }

    if (setting.rif) {
      if (!this.checkIfValid(setting.rif)) {
        throw new BadRequestException(
          'El RIF no puede contener caracteres especiales o invalidos'
        );
      }

      settings.push(
        this.settingsRepository.create({
          id: 'rif',
          value: setting.rif,
        })
      );
    }

    if (
      (setting.description && setting.description != 'undefined') ||
      setting.description === ''
    ) {
      settings.push(
        this.settingsRepository.create({
          id: 'description',
          value: setting.description,
        })
      );
    }

    if (setting.type) {
      settings.push(
        this.settingsRepository.create({
          id: 'type',
          value: setting.type,
        })
      );
    }

    if (setting.userId) {
      settings.push(
        this.settingsRepository.create({
          id: 'userId',
          value: '' + setting.userId,
        })
      );
    }

    await this.settingsRepository.save(settings);

    return await this.getSettingsResponse();
  }

  async deleteSettings(
    delSettings: SettingsDeleteDto
  ): Promise<SettingsResponseDto> {
    if (delSettings.name) {
      await this.settingsRepository.delete({
        id: 'name',
      });
    }

    if (delSettings.rif) {
      await this.settingsRepository.delete({
        id: 'rif',
      });
    }

    if (delSettings.description) {
      await this.settingsRepository.delete({
        id: 'description',
      });
    }

    if (delSettings.type) {
      await this.settingsRepository.delete({
        id: 'type',
      });
    }

    return await this.getSettingsResponse();
  }

  private checkIfValid(value_: string): boolean {
    const spChars = /[@#$%^&*()_+=[\]{}'\\|<>/?]+/;

    return !spChars.test(value_);
  }
}
