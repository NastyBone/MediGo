import * as pdf from 'pdf-creator-node';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReportsDto, ReportsResponseDto } from './dto';
import { DocumentOptions } from './types';
import { CustomAssetsPathFolder } from '../config/constants';
import { recordTemplate, citeTemplate } from './template';
import { SettingsService } from '../repositories/settings/settings.service';

@Injectable()
export class ReportsService {
  constructor(private settings: SettingsService) {
    return;
  }

  async generateReport(
    reportsDto: ReportsDto<any>,
    type: string
  ): Promise<ReportsResponseDto> {
    const settingsData = await this.settings.getAllSettings();
    if (type == 'Citas') {
      const cites = reportsDto.data;
      reportsDto.data = {
        cites,
        ...settingsData
      }
    } else {
      reportsDto.data = {
        ...settingsData,
        ...reportsDto.data,
      };
    }

    const _utcDate = new Date();
    const generateDate = new Date(_utcDate.getTime());

    //GENERAR NOMBRE
    const _pdfName = `Reporte_de_${type}_${generateDate
      .toISOString()
      .slice(0, -5)
      .replace('T', '_')
      .replace(/:/g, '-')}`;
    //OPCIONES
    const document: DocumentOptions = {
      html: type == 'Citas' ? citeTemplate : recordTemplate,
      data: {
        source: reportsDto.data,
        date: generateDate.toLocaleDateString('es'),
        imgSystem: 'http://localhost:3333/api/public/logo.png',
      },
      path: `${CustomAssetsPathFolder}/${_pdfName}.pdf`,
      type: '',
    };
    const pageOptions = {
      format: 'letter',
      orientation: 'portrait',
      border: '10mm',
      footer: {
        height: '10mm',
        contents: {
          default:
            '<span style="color: #444; font-size: 0.5rem">{{page}}/{{pages}}</span>',
        },
      },
    };
    try {
      const _resp = await pdf.create(document, pageOptions);
      console.log(`Reporte generado! Guardado en ${_resp.filename}`);
      return { reportUrl: `http://localhost:3333/api/public/${_pdfName}.pdf` };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('No se pudo crear');
    }
  }
}
