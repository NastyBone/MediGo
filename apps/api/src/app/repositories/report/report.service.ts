import { Injectable } from '@nestjs/common';
import { CiteService } from '../cite/cite.service';

@Injectable()
export class ReportService {
  constructor(private citeService: CiteService) { }
  async findAll(id: number): Promise<{ completed: number; notCompleted: number }> {
    const { completed, notCompleted } = await this.citeService.getData(id);
    return { completed, notCompleted };
  }

  async findBySpecialities(date: { start: string, end: string }): Promise<{ id: number, name: string, count: string }[]> {
    return this.citeService.getDataByRange(date);

  }
}
