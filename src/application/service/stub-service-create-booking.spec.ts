import { HttpRequest, HttpStatusCode } from '@/data/protocols'

import { CreateBookingUsecase } from '@/domain/usecases'
import { DateError } from '@/domain/errors'
import { StubServiceCreateBooking } from '@/application/service/stub-service-create-booking'
import { createBookingParamsMock } from './../../domain/mocks/booking.mock'
import { mockHttpRequest } from '@/data/mocks'

const bookingCalculateTotaltPriceSpy = {
  execute: jest.fn()
}
describe('StubServiceCreateBooking', () => {
  let sut: StubServiceCreateBooking

  beforeEach(() => {
    bookingCalculateTotaltPriceSpy.execute.mockReturnValue({ totalPrice: '200.00', numberOfNights: 2 })

    sut = new StubServiceCreateBooking(bookingCalculateTotaltPriceSpy)
  })

  it('should successfully create a booking when the number of guests are equalt to the max number of guests', async () => {
    const request = mockHttpRequest(createBookingParamsMock(10, 10))

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.ok)
    expect(httpResponse.body).toHaveProperty('booking')
    expect(bookingCalculateTotaltPriceSpy.execute).toHaveBeenCalled()
    expect(bookingCalculateTotaltPriceSpy.execute).toHaveBeenCalledWith({
      startDate: request.body.startDate,
      endDate: request.body.endDate,
      pricePerNight: request.body.property.pricePerNight
    })
  })

  it('should return unauthorized if the number of guests exceeds the maximum', async () => {
    const request: HttpRequest<CreateBookingUsecase.Params> = mockHttpRequest(createBookingParamsMock(11, 10))

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.unauthorized)
  })

  it('should accumulate and return multiple bookings', async () => {
    const firstRequest = mockHttpRequest(createBookingParamsMock(5, 10))
    const secondRequest = mockHttpRequest(createBookingParamsMock(3, 10))

    await sut.request(firstRequest)
    const httpResponse = await sut.request(secondRequest)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.ok)
    expect(httpResponse.body.booking).toHaveLength(2)
  })

  it('should handle invalid input data', async () => {
    const invalidRequest = mockHttpRequest(createBookingParamsMock(-1, 10))

    const httpResponse = await sut.request(invalidRequest)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.unauthorized)
  })

  it('should handle errors from BookingCalculateTotalPrice', async () => {
    bookingCalculateTotaltPriceSpy.execute.mockImplementation(() => {
      throw new DateError()
    })
    const request = mockHttpRequest(createBookingParamsMock(5, 10))

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.badRequest)
    expect(httpResponse.body.booking).toBeUndefined()
  })
})
