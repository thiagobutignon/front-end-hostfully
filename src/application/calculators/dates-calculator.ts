import { CalculateNumberOfNights } from '@/application/protocols/calculate-number-of-nights'
import { DateError } from '@/domain/errors'

export class DatesCalculator implements CalculateNumberOfNights {
  execute (params: CalculateNumberOfNights.Params): number {
    const { startDate, endDate } = params
    if (startDate > endDate) {
      throw new DateError()
    }
    if (startDate.toDateString() === endDate.toDateString()) {
      return 1
    } else {
      const timeDiff = endDate.getTime() - startDate.getTime()
      return Math.ceil(timeDiff / (1000 * 3600 * 24))
    }
  }
}
