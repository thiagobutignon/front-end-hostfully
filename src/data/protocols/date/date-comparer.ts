export interface DateComparer {
  isSameDay: (entryDate: Date, dateToCompare: Date) => boolean
}
