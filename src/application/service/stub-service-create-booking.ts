import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'
import { calculateBooking, validateBooking } from '@/application/helpers'

import { Booking } from '@/domain/models'
import { BookingCalculateTotalPrice } from '@/application/protocols'
import { BookingRepository } from '@/domain/repository'
import { CreateBookingUsecase } from '@/domain/usecases'
import { DateError } from '@/domain/errors'
import { Validation } from '@/validation/protocols'
import { faker } from '@faker-js/faker'

export class StubServiceCreateBooking implements HttpClient<CreateBookingUsecase.Result> {
  constructor (private readonly bookingCalculator: BookingCalculateTotalPrice,
    private readonly bookingsRepository: BookingRepository,
    private readonly bookingValidationService: Validation) {}

  async request (data: HttpRequest<CreateBookingUsecase.Params>): Promise<HttpResponse<CreateBookingUsecase.Result>> {
    try {
      const params = data.body
      const validationBooking = validateBooking(this.bookingValidationService, params)
      if (validationBooking) {
        return validationBooking
      }

      const { startDate, endDate } = params
      const { totalPrice, numberOfNights } = calculateBooking(this.bookingCalculator, params)

      const newBooking: Booking.Model = {
        id: faker.string.alphanumeric(),
        totalPrice,
        numberOfNights,
        startDate,
        endDate,
        hostEmail: faker.internet.email(),
        guests: params.guests,
        property: params.property,
        guestEmail: params.guestEmail
      }

      this.bookingsRepository.add(newBooking)

      const response = this.bookingsRepository.getAll()

      return {
        statusCode: HttpStatusCode.ok,
        body: { booking: response }
      }
    } catch (error) {
      if (error instanceof DateError) {
        return {
          statusCode: HttpStatusCode.badRequest
        }
      }
    }
  }
}
