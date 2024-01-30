import { HttpRequest, HttpStatusCode } from '@/data/protocols'

import { BookingValidationService } from '@/application/validation'
import { CacheBookingRepository } from '@/application/repository'
import { CreateBookingUsecase } from '@/domain/usecases'
import { DateError } from '@/domain/errors'
import { DateFnsAdapter } from '@/infra/date'
import { StubServiceCreateBooking } from '@/application/service'
import { Validation } from '@/validation/protocols'
import { createBookingParamsMock } from '@/domain/mocks'
import { mockHttpRequest } from '@/data/mocks'

const bookingCalculateTotaltPriceSpy = {
  execute: jest.fn()
}

describe('StubServiceCreateBooking', () => {
  let sut: StubServiceCreateBooking
  let bookingsRepository: CacheBookingRepository
  let bookingValidation: Validation

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-01').getTime())

    bookingCalculateTotaltPriceSpy.execute.mockReturnValue({ totalPrice: '200.00', numberOfNights: 2 })
    bookingsRepository = new CacheBookingRepository()
    bookingValidation = new BookingValidationService(new CacheBookingRepository(), new DateFnsAdapter())
    sut = new StubServiceCreateBooking(bookingCalculateTotaltPriceSpy, bookingsRepository, bookingValidation)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should successfully create a booking when the number of guests are equal to the max number of guests', async () => {
    const request = mockHttpRequest(createBookingParamsMock(10, 10, new Date('2024-01-02')))

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.ok)
    expect(httpResponse.body).toHaveProperty('booking')
    expect(bookingCalculateTotaltPriceSpy.execute).toHaveBeenCalled()
    const { startDate, endDate } = request.body
    const { pricePerNight, cleaningFee, serviceFee } = request.body.property
    expect(bookingCalculateTotaltPriceSpy.execute).toHaveBeenCalledWith({
      startDate,
      endDate,
      pricePerNight,
      cleaningFee,
      serviceFee
    })
  })

  it('should return unauthorized if the number of guests exceeds the maximum', async () => {
    const request: HttpRequest<CreateBookingUsecase.Params> = mockHttpRequest(createBookingParamsMock(11, 10))

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.unauthorized)
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
    const request = mockHttpRequest(createBookingParamsMock(5, 10, new Date('2024-01-02')))

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.badRequest)
    expect(httpResponse.body.booking).toBeUndefined()
  })
})
