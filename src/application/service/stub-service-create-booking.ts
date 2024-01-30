import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'

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
      const validationError = this.bookingValidationService.validate('guests', data.body)
      if (validationError) {
        return {
          statusCode: HttpStatusCode.unauthorized,
          body: { error: validationError }
        }
      }

      const doubleBookingError = this.bookingValidationService.validate('booking', { booking: data.body })
      if (doubleBookingError) {
        return {
          statusCode: HttpStatusCode.conflict,
          body: { error: doubleBookingError }
        }
      }

      const params = data.body
      const { totalPrice, numberOfNights } = this.bookingCalculator.execute({
        endDate: params.endDate,
        startDate: params.startDate,
        pricePerNight: params.property.pricePerNight
      })

      const newBooking: Booking.Model = {
        id: faker.string.alphanumeric(),
        totalPrice,
        numberOfNights,
        startDate: params.startDate,
        endDate: params.endDate,
        hostEmail: faker.internet.email(),
        guests: params.guests,
        property: params.property
      }

      this.bookingsRepository.add(newBooking)
      const response: CreateBookingUsecase.Result = {
        booking: [newBooking]
      }
      return {
        statusCode: HttpStatusCode.ok,
        body: response
      }
    } catch (error) {
      if (error instanceof DateError) {
        return {
          statusCode: HttpStatusCode.badRequest,
          body: { error: error.message }
        }
      }
    }
  }
}
