export interface DateClient {
  isSameDay: (entryDate: Date, dateToCompare: Date) => boolean
  isBefore: (dateToCheck: Date, dateToCompare: Date) => boolean
  isWithinInterval: (date: Date, interval: { start: Date, end: Date }) => boolean
  startOfDay: (date: Date) => Date
}
