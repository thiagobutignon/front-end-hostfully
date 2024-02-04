import {
  makeBookingCalculator,
  makeBookingValidationService
} from '@/main/factories'

import { RemoteUpdateBooking } from '@/data/usecases'
import { StubServiceUpdateBooking } from '@/application/service'
import { cacheBookingSingleton } from '@/main/singleton'

export const makeRemoteUpdateBooking = (): RemoteUpdateBooking => {
  const stubService = new StubServiceUpdateBooking(
    makeBookingCalculator(),
    cacheBookingSingleton,
    makeBookingValidationService()
  )
  return new RemoteUpdateBooking('', stubService)
}
