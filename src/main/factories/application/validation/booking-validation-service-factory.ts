import { makeCacheBookingRepository, makeDateFnsAdapter } from '@/main/factories'

import { BookingValidationService } from '@/application/validation'

export const makeBookingValidationService = (): BookingValidationService => {
  const cache = makeCacheBookingRepository()
  const dateAdapter = makeDateFnsAdapter()
  return new BookingValidationService(cache, dateAdapter)
}
