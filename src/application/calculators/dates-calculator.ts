import { CalculateNumberOfNights } from '@/application/protocols/calculate-number-of-nights'

export class DatesCalculator implements CalculateNumberOfNights {
  execute (params: CalculateNumberOfNights.Params): number {
    const { startDate, endDate } = params
    if (startDate.toDateString() === endDate.toDateString()) {
      return 1
    } else {
      const timeDiff = endDate.getTime() - startDate.getTime()
      return Math.ceil(timeDiff / (1000 * 3600 * 24))
    }
  }
}
