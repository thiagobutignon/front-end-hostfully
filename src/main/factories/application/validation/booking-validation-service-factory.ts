import { BookingValidationService } from '@/application/validation'
import { cacheBookingSingleton } from '@/main/singleton'
import { makeDateFnsAdapter } from '@/main/factories'

export const makeBookingValidationService = (): BookingValidationService => {
  const dateAdapter = makeDateFnsAdapter()
  return new BookingValidationService(cacheBookingSingleton, dateAdapter)
}
