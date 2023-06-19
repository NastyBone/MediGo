// eslint-disable-next-line @typescript-eslint/no-unused-vars, @nrwl/nx/enforce-module-boundaries

import { ReportVM } from '../model';

export function Report2ReportVM(report: {
  completed: number;
  notCompleted: number;
}): ReportVM {
  return {
    completed: report.completed,
    notCompleted: report.notCompleted,
  };
}
