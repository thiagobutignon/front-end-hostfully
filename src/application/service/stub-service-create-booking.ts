import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'

import { Booking } from '@/domain/models'
import { BookingCalculateTotalPrice } from '@/application/protocols'
import { CreateBookingUsecase } from '@/domain/usecases'
import { DateError } from '@/domain/errors'
import { faker } from '@faker-js/faker'

export class StubServiceCreateBooking implements HttpClient<CreateBookingUsecase.Result> {
  private readonly bookings: CreateBookingUsecase.Result['booking'] = []
  constructor (private readonly bookingCalculator: BookingCalculateTotalPrice) {}

  async request (data: HttpRequest<CreateBookingUsecase.Params>): Promise<HttpResponse<CreateBookingUsecase.Result>> {
    try {
      const params = data.body
      const { totalPrice, numberOfNights } = this.bookingCalculator.execute({
        endDate: params.endDate,
        startDate: params.startDate,
        pricePerNight: params.property.pricePerNight
      })

      if (params.guests.numberOfGuests > params.property.maxGuests || params.guests.numberOfGuests < 1) {
        return {
          statusCode: HttpStatusCode.unauthorized
        }
      }

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

      this.bookings.push(newBooking)

      const response: CreateBookingUsecase.Result = {
        booking: this.bookings
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
