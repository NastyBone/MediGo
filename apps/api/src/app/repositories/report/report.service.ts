import { Injectable } from '@nestjs/common';
import { CiteService } from '../cite/cite.service';

@Injectable()
export class ReportService {
  constructor(private citeService: CiteService) { }
  async findAll(): Promise<{ completed: number; notCompleted: number }> {
    const { completed, notCompleted } = await this.citeService.getData();
    return { completed, notCompleted };
  }
  async findByDoctor(
    id: number
  ): Promise<{ completed: number; notCompleted: number }> {
    const { completed, notCompleted } = await this.citeService.getDataByDoctor(
      id
    );
    return { completed, notCompleted };
  }
}
