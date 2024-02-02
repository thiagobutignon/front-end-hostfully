import { makeBookingCalculator, makeBookingValidationService, makeCacheBookingRepository } from '@/main/factories'

import { StubServiceCreateBooking } from '@/application/service'

export const makeStubServiceCreateBooking = (): StubServiceCreateBooking => {
  const bookingCalculator = makeBookingCalculator()
  const cache = makeCacheBookingRepository()
  const validation = makeBookingValidationService()
  return new StubServiceCreateBooking(bookingCalculator, cache, validation)
}
