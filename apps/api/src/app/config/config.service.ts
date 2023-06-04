import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import { basename, dirname, resolve } from 'path';
import { CustomAssetsPathFolder, DefaultAssetsFolder } from './constants';
import { Response } from 'express';
@Injectable()
export class ConfigService {
  async getAsset(
    res: Response,
    name: string
  ): Promise<void | NotFoundException> {
    let pathAsset = resolve(CustomAssetsPathFolder, name);

    if (!existsSync(pathAsset)) {
      pathAsset = resolve(DefaultAssetsFolder, name);
    }

    if (!existsSync(pathAsset)) {
      throw new NotFoundException('No se ha encontrado el archivo');
    }

    res.sendFile(basename(pathAsset), {
      root: dirname(pathAsset),
    });
  }
}
