import { TestBed, inject } from '@angular/core/testing';
import { getDateTimestamp, parseToDate, isDateInLimits } from '../date.service';

describe('Date-service', () => {

  it('should getDateTimestamp to get correct timestamp', () => {
    const date = '2020-10-15';
    const res = 1604664728000;
    expect(getDateTimestamp(date)).toBe(res);
  });

  it('expect parseToDate get values', () => {
    const date = '2020-10-15';
    const res = { day: 15, month: 10, year: 2020 };
    expect(parseToDate(date)).toBe(res);
  });

  it('expect isDateInLimits in limits', () => {
    const date = getDateTimestamp('2020-10-15');
    const date2 = getDateTimestamp('2020-11-15');
    expect(isDateInLimits(date, date2)).toBe(true);
  });
});
