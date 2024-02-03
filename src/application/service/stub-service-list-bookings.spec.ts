import { BookingRepository } from '@/domain/repository'
import { HttpStatusCode } from '@/data/protocols'
import { ListBookingsUsecase } from '@/domain/usecases'
import { StubServiceListBookings } from '@/application/service'
import { createBookingsResultMock } from '@/domain/mocks'

describe('StubServiceListBookings', () => {
  let sut: StubServiceListBookings
  let mockBookingsRepository: jest.Mocked<BookingRepository>
  let mockBookings: ListBookingsUsecase.Result['booking']

  beforeEach(() => {
    mockBookings = createBookingsResultMock().booking
    mockBookingsRepository = {
      getAll: jest.fn().mockReturnValue(mockBookings),
      add: jest.fn(),
      update: jest.fn() as jest.Mock<BookingRepository.UpdateResult>,
      delete: jest.fn() as jest.Mock<BookingRepository.DeleteResult>
    }
    sut = new StubServiceListBookings(mockBookingsRepository)
  })

  test('should return a list of bookings with status code 200', async () => {
    const httpResponse = await sut.request()

    expect(httpResponse.statusCode).toBe(HttpStatusCode.ok)
    expect(httpResponse.body).toEqual({ booking: mockBookings })
  })

  test('should return a bad request error if an error occurs', async () => {
    mockBookingsRepository.getAll.mockImplementationOnce(() => {
      throw new Error('Test error')
    })

    const httpResponse = await sut.request()

    expect(httpResponse.statusCode).toBe(HttpStatusCode.badRequest)
    expect(httpResponse.body).toEqual({ error: 'An error occurred while listing bookings' })
  })
})
