import { Injectable } from '@nestjs/common';
import { CiteService } from '../cite/cite.service';

@Injectable()
export class ReportService {
  constructor(private citeService: CiteService) { }
  async findAll(id: number): Promise<{ completed: number; notCompleted: number }> {
    const { completed, notCompleted } = await this.citeService.getData(id);
    return { completed, notCompleted };
  }
}
