import { addDays, format } from 'date-fns'

export class DateInfo {
  constructor (private readonly baseDate = new Date()) { }

  getFormattedDate (daysToAdd = 0): Date {
    return new Date(format(addDays(this.baseDate, daysToAdd), 'yyyy-MM-dd'))
  }

  getCurrentDate (): Date {
    return this.getFormattedDate()
  }

  getStartDate (startDays: number = 1): Date {
    return this.getFormattedDate(startDays)
  }

  getEndDate (daysUntilEnd: number = 3): Date {
    return this.getFormattedDate(daysUntilEnd)
  }
}
