import { makeRemoteCreateBooking, makeRemoteListBookings } from '@/main/factories/data'

import { RemoteListBookings } from '@/data/usecases'
import { cacheSingleton } from '@/main/singleton'
import { realBooking } from '@/integration/helpers'

describe('ListBookingUsecase Integration Test', () => {
  let sut: RemoteListBookings

  beforeEach(async () => {
    sut = makeRemoteListBookings()
    await makeRemoteCreateBooking().perform(realBooking())
  })

  afterEach(() => {
    jest.clearAllMocks()
    cacheSingleton.clearCacheTestOnly()
  })
  test('should list bookings', async () => {
    const response = await sut.perform()

    expect(response.booking).toBeDefined()
    expect(response).toBeTruthy()
    expect(response.booking).toHaveLength(1)
  })
})
