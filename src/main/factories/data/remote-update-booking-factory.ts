import { makeBookingCalculator, makeBookingValidationService } from '@/main/factories'

import { RemoteUpdateBooking } from '@/data/usecases'
import { StubServiceUpdateBooking } from '@/application/service'
import { cacheSingleton } from '@/main/singleton'

export const makeRemoteUpdateBooking = (): RemoteUpdateBooking => {
  const stubService = new StubServiceUpdateBooking(makeBookingCalculator(), cacheSingleton, makeBookingValidationService())
  return new RemoteUpdateBooking('', stubService)
}
