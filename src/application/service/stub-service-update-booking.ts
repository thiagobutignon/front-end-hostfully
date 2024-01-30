import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'
import { calculateBooking, validateBooking } from '@/application/helpers'

import { BookingCalculateTotalPrice } from '@/application/protocols'
import { BookingRepository } from '@/domain/repository'
import { DateError } from '@/domain/errors'
import { UpdateBookingUsecase } from '@/domain/usecases'
import { Validation } from '@/validation/protocols'

export class StubServiceUpdateBooking implements HttpClient<UpdateBookingUsecase.Result> {
  constructor (
    private readonly bookingCalculator: BookingCalculateTotalPrice,
    private readonly bookingsRepository: BookingRepository,
    private readonly bookingValidationService: Validation
  ) {}

  async request (data: HttpRequest<UpdateBookingUsecase.Params>): Promise<HttpResponse<UpdateBookingUsecase.Result>> {
    try {
      const params = data.body
      const validationBooking = validateBooking(this.bookingValidationService, params)

      if (validationBooking) {
        return {
          statusCode: validationBooking.statusCode,
          body: validationBooking.body
        }
      }

      const existingBooking = this.bookingsRepository.getAll().find(booking => booking.id === params.id)
      if (!existingBooking) {
        return {
          statusCode: HttpStatusCode.notFound,
          body: { error: 'Booking not found' }
        }
      }

      const { totalPrice, numberOfNights } = calculateBooking(this.bookingCalculator, params)

      const updatedBooking = {
        ...existingBooking,
        ...params,
        totalPrice,
        numberOfNights
      }
      this.bookingsRepository.update(updatedBooking)

      return {
        statusCode: HttpStatusCode.ok,
        body: { booking: [updatedBooking] }
      }
    } catch (error) {
      if (error instanceof DateError) {
        return {
          statusCode: HttpStatusCode.badRequest,
          body: { error: error.message }
        }
      }

      return {
        statusCode: HttpStatusCode.serverError,
        body: { error: 'Unexpected error occurred' }
      }
    }
  }
}
