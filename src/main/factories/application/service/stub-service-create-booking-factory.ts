import {
  makeBookingCalculator,
  makeBookingValidationService
} from '@/main/factories'

import { StubServiceCreateBooking } from '@/application/service'
import { cacheBookingSingleton } from '@/main/singleton'

export const makeStubServiceCreateBooking = (): StubServiceCreateBooking => {
  const bookingCalculator = makeBookingCalculator()
  const validation = makeBookingValidationService()
  return new StubServiceCreateBooking(
    bookingCalculator,
    cacheBookingSingleton,
    validation
  )
}
