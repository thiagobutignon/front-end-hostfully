import { HttpRequest, HttpStatusCode } from '@/data/protocols'

import { CacheBookingRepository } from '@/application/repository'
import { DeleteBookingByIdUsecase } from '@/domain/usecases'
import { StubServiceDeleteBookingById } from '@/application/service'
import { bookingModelMock } from '@/domain/mocks'
import { mockHttpRequest } from '@/data/mocks'

describe('StubServiceDeleteBookingById', () => {
  let sut: StubServiceDeleteBookingById
  let bookingsRepository: CacheBookingRepository

  beforeEach(() => {
    bookingsRepository = new CacheBookingRepository()
    sut = new StubServiceDeleteBookingById(bookingsRepository)
  })

  it('should successfully delete a booking', async () => {
    const booking = bookingModelMock('existing-booking-id')
    bookingsRepository.add(booking)
    const request: HttpRequest<DeleteBookingByIdUsecase.Params> = mockHttpRequest({ id: 'existing-booking-id' })

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.ok)
    expect(httpResponse.body).toBe(true)
  })

  it('should return not found if booking does not exist', async () => {
    const request: HttpRequest<DeleteBookingByIdUsecase.Params> = mockHttpRequest({ id: 'non-existent-booking-id' })

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.notFound)
    expect(httpResponse.body).toEqual({ error: 'Booking not found' })
  })

  it('should handle unexpected errors', async () => {
    const throwError = (): any => {
      throw new Error('Unexpected error')
    }
    bookingsRepository.delete = throwError
    const request: HttpRequest<DeleteBookingByIdUsecase.Params> = mockHttpRequest({ id: 'existing-booking-id' })

    const httpResponse = await sut.request(request)

    expect(httpResponse.statusCode).toBe(HttpStatusCode.serverError)
    expect(httpResponse.body).toEqual({ error: 'Unexpected error occurred' })
  })
})
