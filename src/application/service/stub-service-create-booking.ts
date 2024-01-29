import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'

import { BookingCalculateTotalPrice } from '@/application/protocols'
import { CreateBookingUsecase } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export class StubServiceCreateBooking implements HttpClient<CreateBookingUsecase.Result> {
  constructor (private readonly bookingCalculator: BookingCalculateTotalPrice) {}
  async request (data: HttpRequest<CreateBookingUsecase.Params>): Promise<HttpResponse<CreateBookingUsecase.Result>> {
    const params = data.body
    const { totalPrice, numberOfNights } = this.bookingCalculator.execute({
      endDate: params.endDate,
      startDate: params.startDate,
      pricePerNight: params.property.pricePerNight
    })

    if (params.guests.numberOfGuests > params.property.maxGuests) {
      return {
        statusCode: HttpStatusCode.unauthorized
      }
    }

    const response: CreateBookingUsecase.Result = {
      booking: [{
        id: faker.string.alphanumeric(),
        totalPrice,
        numberOfNights,
        startDate: params.startDate,
        endDate: params.endDate,
        hostEmail: faker.internet.email(),
        guests: params.guests,
        propertyId: params.propertyId
      }]
    }
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      statusCode: HttpStatusCode.ok,
      body: response
    }
  }
}
