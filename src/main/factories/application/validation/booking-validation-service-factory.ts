import { BookingValidationService } from '@/application/validation'
import { cacheSingleton } from '@/main/singleton'
import { makeDateFnsAdapter } from '@/main/factories'

export const makeBookingValidationService = (): BookingValidationService => {
  const dateAdapter = makeDateFnsAdapter()
  return new BookingValidationService(cacheSingleton, dateAdapter)
}
