import { existsSync, mkdirSync } from 'fs';
import { diskStorage, StorageEngine } from 'multer';
import { Request } from 'express';
import 'multer';
import { CustomAssetsPathFolder, ImgName } from './config';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { UnsupportedMediaTypeException } from '@nestjs/common';

/**
 * Configuraicon de Storage para almacenar los archivos subidos
 */
export const options: MulterModuleOptions = {
  storage: storageConfig(ImgName, CustomAssetsPathFolder),
  fileFilter: fileMimetypeFilter('image/jpeg', 'image/png', 'image/jpg'),
};

function storageConfig(
  _imageName: string,
  _customFolderPath: string
): StorageEngine {
  return diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      const uploadPath = _customFolderPath;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, _imageName.replace('.jpg', `_${Date.now()}.jpg`));
    },
  });
}

// req: any, file: any, callback: (error: Error | null, acceptFile: boolean) => void

function fileMimetypeFilter(
  ...mimetypes: string[]
): (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void
) => void {
  return (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void
  ) => {
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(
          `El tipo de archivo no es compatible con: ${mimetypes
            .map((x) => x.replace('image/', ''))
            .join(', ')}`
        ),
        false
      );
    }
  };
}
