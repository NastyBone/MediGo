import { ReportRangeVM } from "../model";

export function ReportRange2ReportRangeVM(report: ReportRangeVM): ReportRangeVM {
  return {
    id: report.id, name: report.name, count: +report.count
  };
}
