// eslint-disable-next-line @typescript-eslint/no-unused-vars, @nrwl/nx/enforce-module-boundaries

import { ReportVM } from '../model';

export function Report2ReportVM(report: ReportVM): ReportVM {
  return {
    completed: report.completed,
    notCompleted: report.notCompleted,
  };
}
