import { DateInfo, realBooking } from '@/integration/helpers'
import {
  makeRemoteCreateBooking,
  makeRemoteUpdateBooking
} from '@/main/factories/data'

import { RemoteUpdateBooking } from '@/data/usecases'
import { cacheBookingSingleton } from '@/main/singleton'

describe('UpdateBookingUsecase Integration Test', () => {
  let sut: RemoteUpdateBooking

  beforeEach(async () => {
    sut = makeRemoteUpdateBooking()
    await makeRemoteCreateBooking().perform(realBooking())
  })

  afterEach(() => {
    jest.clearAllMocks()
    cacheBookingSingleton.clearCacheTestOnly()
  })
  test('should update a booking', async () => {
    const params = cacheBookingSingleton.getAll()
    const response = await sut.perform({
      ...params[0],
      startDate: new DateInfo().getStartDate(10),
      endDate: new DateInfo().getEndDate(20)
    })

    expect(response.booking).toBeDefined()
    expect(response).toBeTruthy()
  })
})
