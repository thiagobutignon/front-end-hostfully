import { DateComparer } from '@/data/protocols/date'
import { isSameDay as isSameDayFn } from 'date-fns'

export class DateFnsAdapter implements DateComparer {
  isSameDay (entryDate: Date, dateToCompare: Date): boolean {
    return isSameDayFn(entryDate, dateToCompare)
  }
}
