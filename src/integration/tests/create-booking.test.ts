import { CacheBookingRepository } from '@/application/repository'
import { RemoteCreateBooking } from '@/data/usecases'
import { makeUrl } from '@/main/factories'
import { makeCacheBookingRepository } from '../../main/factories/application/repository/cache-booking-repository-factory'
import { makeStubServiceCreateBooking } from '../../main/factories/application/service/stub-service-create-booking-factory'

export const makeRemoteCreateBooking = (): RemoteCreateBooking => {
    const stubService = makeStubServiceCreateBooking();
    return new RemoteCreateBooking(makeUrl('/'), stubService);
};

describe('CreateBooking Integration Test', () => {
  let cacheBookingRepository: CacheBookingRepository
  let remoteCreateBooking: RemoteCreateBooking

  beforeEach(() => {
    cacheBookingRepository = makeCacheBookingRepository()
    remoteCreateBooking = 
  })
})
