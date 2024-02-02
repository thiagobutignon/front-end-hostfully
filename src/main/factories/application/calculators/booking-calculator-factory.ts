import { BookingCalculator } from '@/application/calculators'
import { makeDatesCalculator } from '@/main/factories'

export const makeBookingCalculator = (): BookingCalculator => {
  const datesCalculator = makeDatesCalculator()
  return new BookingCalculator(datesCalculator)
}
