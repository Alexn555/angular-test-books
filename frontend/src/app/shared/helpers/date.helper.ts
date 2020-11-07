// Date utility service

type dateObj = {
  day: number;
  month: number;
  year: number;
};

export function getDateTimestamp(dateStr: string): number {
  const date = parseToDate(dateStr);
  const formatDate = new Date( date.year, date.month - 1, date.day);
  const tms = formatDate.getTime();
  return tms;
}

export function parseToDate(dateStr = ''): dateObj {
  const date = dateStr.split('-');
  const month = parseInt(date[1], 10);
  const year = parseInt(date[2], 10);
  const day = parseInt(date[0], 10);
  return { day, month, year };
}

export function isDateInLimits(startDate: number, endDate: number, dayLimit = 30): boolean {
  const dLimit = dayLimit * 86400000; // milleseconds
  const range = endDate - startDate;
  return dLimit >= range;
}
