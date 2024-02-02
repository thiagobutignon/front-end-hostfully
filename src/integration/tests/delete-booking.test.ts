import { makeRemoteCreateBooking, makeRemoteDeleteBookingById } from '@/main/factories/data'

import { NotFoundError } from '@/domain/errors'
import { RemoteDeleteBookingById } from '@/data/usecases'
import { cacheSingleton } from '@/main/singleton'
import { realBooking } from '@/integration/helpers'

describe('DeleteBookingByIdUsecase Integration Test', () => {
  let sut: RemoteDeleteBookingById

  beforeEach(async () => {
    sut = makeRemoteDeleteBookingById()
    await makeRemoteCreateBooking().perform(realBooking())
  })

  afterEach(() => {
    jest.clearAllMocks()
    cacheSingleton.clearCacheTestOnly()
  })
  test('should delete booking by id', async () => {
    const params = cacheSingleton.getAll()
    const response = await sut.perform({
      id: params[0].id
    })

    expect(response).toBeTruthy()

    await expect(sut.perform({
      id: 'any_value'
    })).rejects.toThrow(new NotFoundError())
  })

  test('should throw not found if the id dont exist', async () => {
    await expect(
      sut.perform({ id: 'any_value' })
    ).rejects.toThrow(new NotFoundError())
  })
})
