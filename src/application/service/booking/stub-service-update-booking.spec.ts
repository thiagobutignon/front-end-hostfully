import { HttpRequest, HttpStatusCode } from '@/data/protocols'

import { BookingValidationService } from '@/application/validation'
import { CacheBookingRepository } from '@/application/repository'
import { DateError } from '@/domain/errors'
import { DateFnsAdapter } from '@/infra/date'
import { StubServiceUpdateBooking } from '@/application/service'
import { UpdateBookingUsecase } from '@/domain/usecases'
import { Validation } from '@/validation/protocols'
import { bookingModelMock } from '@/domain/mocks'
import { mockHttpRequest } from '@/data/mocks'

const bookingCalculateTotaltPriceSpy = {
  execute: jest.fn()
}

describe('StubServiceUpdateBooking', () => {
  let sut: StubServiceUpdateBooking
  let bookingsRepository: CacheBookingRepository
  let bookingValidation: Validation

  beforeEach(() => {
    jest.resetAllMocks()

    jest.useFakeTimers().setSystemTime(new Date('2024-01-01').getTime())

    bookingCalculateTotaltPriceSpy.execute.mockReturnValue({ totalPrice: '300.00', numberOfNights: 3 })
    bookingsRepository = new CacheBookingRepository()
    bookingsRepository.add(bookingModelMock('existing-booking-id', new Date('2024-01-02'), new Date('2024-01-03')))

    bookingValidation = new BookingValidationService(bookingsRepository, new DateFnsAdapter())
    sut = new StubServiceUpdateBooking(bookingCalculateTotaltPriceSpy, bookingsRepository, bookingValidation)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should successfully update a booking', async () => {
    const params = bookingModelMock('existing-booking-id', new Date('2024-01-06'), new Date('2024-01-07'))
    const request: HttpRequest<UpdateBookingUsecase.Params> = mockHttpRequest(params)

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.ok)
    expect(httpResponse.body).toHaveProperty('booking')
    expect(bookingCalculateTotaltPriceSpy.execute).toHaveBeenCalledWith({
      startDate: params.startDate,
      endDate: params.endDate,
      pricePerNight: params.property.pricePerNight,
      cleaningFee: params.property.cleaningFee,
      serviceFee: params.property.serviceFee
    })
  })

  test('should return not found if booking does not exist', async () => {
    const params = bookingModelMock('non-existent-booking-id')
    const request: HttpRequest<UpdateBookingUsecase.Params> = mockHttpRequest(params)

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.notFound)
  })

  test('should return unauthorized if validation fails', async () => {
    const params = bookingModelMock('existing-booking-id', new Date('2024-01-06'), new Date('2024-01-07'), 10, 9)
    const request: HttpRequest<UpdateBookingUsecase.Params> = mockHttpRequest(params)

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.unauthorized)
  })

  test('should handle errors from BookingCalculateTotalPrice', async () => {
    bookingCalculateTotaltPriceSpy.execute.mockImplementation(() => {
      throw new DateError()
    })
    const params = bookingModelMock('existing-booking-id')
    const request: HttpRequest<UpdateBookingUsecase.Params> = mockHttpRequest(params)

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.conflict)
  })

  test('should return conflict if there is a double booking', async () => {
    bookingsRepository.getAll = jest.fn().mockReturnValueOnce([bookingModelMock('existing-booking-id', new Date('2024-01-06'), new Date('2024-01-07'))])

    const params = bookingModelMock('existing-booking-id', new Date('2024-01-06'), new Date('2024-01-07'))
    const request: HttpRequest<UpdateBookingUsecase.Params> = mockHttpRequest(params)

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.conflict)
    expect(httpResponse.body.error).toBeDefined()
  })

  test('should handle unexpected server errors', async () => {
    jest.spyOn(bookingsRepository, 'getAll').mockImplementationOnce(() => {
      throw new Error('Unexpected server error')
    })

    const params = bookingModelMock('existing-booking-id')
    const request: HttpRequest<UpdateBookingUsecase.Params> = mockHttpRequest(params)

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.serverError)
    expect(httpResponse.body.error).toBe('Unexpected error occurred')
  })

  test('should return bad request if BookingCalculateTotalPrice throws DateError', async () => {
    bookingCalculateTotaltPriceSpy.execute.mockImplementation(() => {
      throw new DateError()
    })

    const params = bookingModelMock('existing-booking-id', new Date('2024-01-06'), new Date('2024-01-07'))
    const request: HttpRequest<UpdateBookingUsecase.Params> = mockHttpRequest(params)

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.badRequest)
    expect(httpResponse.body.error).toBe(new DateError().message)
  })
})
