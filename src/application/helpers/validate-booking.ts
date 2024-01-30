import { HttpResponse, HttpStatusCode } from '@/data/protocols'

import { Booking } from '@/domain/models'
import { Validation } from '@/validation/protocols'

export const validateBooking = (
  bookingValidationService: Validation,
  params: Booking.Params | Booking.Model
): HttpResponse => {
  const validationError = bookingValidationService.validate('guests', params)
  if (validationError) {
    return {
      statusCode: HttpStatusCode.unauthorized,
      body: { error: validationError }
    }
  }

  const doubleBookingError = bookingValidationService.validate('booking', { booking: params })
  if (doubleBookingError) {
    return {
      statusCode: HttpStatusCode.conflict,
      body: { error: doubleBookingError }
    }
  }
}
