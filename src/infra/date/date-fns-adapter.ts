import { isBefore as isBeforeFns, isSameDay as isSameDayFns, isWithinInterval as isWithinIntervalFns, startOfDay as startOfDayFns } from 'date-fns'

import { DateClient } from '@/data/protocols/date'

export class DateFnsAdapter implements DateClient {
  isSameDay (entryDate: Date, dateToCompare: Date): boolean {
    return isSameDayFns(entryDate, dateToCompare)
  }

  isBefore (dateToCheck: Date, dateToCompare: Date): boolean {
    return isBeforeFns(dateToCheck, dateToCompare)
  }

  isWithinInterval (date: Date, interval: { start: Date, end: Date }): boolean {
    return isWithinIntervalFns(date, interval)
  }

  startOfDay (date: Date): Date {
    return startOfDayFns(date)
  }
}
