import { AvailabilityVM } from 'apps/dashboard/src/app/repositories/availability/model';
import { CiteVM } from 'apps/dashboard/src/app/repositories/cite/model';
import moment from 'moment';

export function timeStringToDate(
  date: string,
  time: string,
  yesterday: boolean = false
): Date {
  let fixedDate = new Date(
    moment
      .utc(date + ' ' + time, 'DD/MM/YYYY hh:mm a')
      .format('MM/DD/YYYY hh:mm a')
  );
  if (yesterday) {
    fixedDate = new Date(
      moment
        .utc(date + ' ' + time, 'DD/MM/YYYY hh:mm a')
        .subtract(1, 'day')
        .format('MM/DD/YYYY hh:mm a')
    );
  }
  return fixedDate;
}

export function checkTimeRange(start: string, end: string): boolean {
  return moment.utc(end, 'hh:mm a') > moment.utc(start, 'hh:mm a');
}

export function checkTimeConflict(
  start: string,
  end: string,
  day: string,
  doctorId: number,
  data: AvailabilityVM[]
): boolean {
  let flag = true;
  data.map((aval) => {
    if (doctorId == aval.doctorId) {
      if (day == aval.day) {
        if (
          moment.utc(start, 'hh:mm a') >= moment.utc(aval.start, 'hh:mm a') &&
          moment.utc(start, 'hh:mm a') <= moment.utc(aval.end, 'hh:mm a')
        ) {
          flag = false;
        }
        if (
          moment.utc(end, 'hh:mm a') >= moment.utc(aval.start, 'hh:mm a') &&
          moment.utc(end, 'hh:mm a') <= moment.utc(aval.end, 'hh:mm a')
        ) {
          flag = false;
        }
        if (
          moment.utc(start, 'hh:mm a') >= moment.utc(aval.start, 'hh:mm a') &&
          moment.utc(end, 'hh:mm a') <= moment.utc(aval.start, 'hh:mm a')
        ) {
          flag = false;
        }
        if (
          moment.utc(start, 'hh:mm a') >= moment.utc(aval.end, 'hh:mm a') &&
          moment.utc(end, 'hh:mm a') <= moment.utc(aval.end, 'hh:mm a')
        ) {
          flag = false;
        }
      }
    }
  });
  return flag;
}

export function formatDate(str: string | Date): string | Date {
  return new Date(
    moment.utc(str, 'DD/MM/YYYY hh:mm a').format('MM/DD/YYYY hh:mm a')
  );
}

export function dateFixFormat(date: string) {
  const [day, month, year] = date.split('/');
  return new Date(+year, +month - 1, +day, 0, 0, 0).toISOString();
}
