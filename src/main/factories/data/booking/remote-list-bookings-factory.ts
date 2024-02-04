import { RemoteListBookings } from '@/data/usecases'
import { StubServiceListBookings } from '@/application/service'
import { cacheBookingSingleton } from '@/main/singleton'

export const makeRemoteListBookings = (): RemoteListBookings => {
  const stubService = new StubServiceListBookings(cacheBookingSingleton)
  return new RemoteListBookings('', stubService)
}
