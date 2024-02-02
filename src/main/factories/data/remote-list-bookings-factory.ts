import { RemoteListBookings } from '@/data/usecases'
import { StubServiceListBookings } from '@/application/service'
import { cacheSingleton } from '@/main/singleton'

export const makeRemoteListBookings = (): RemoteListBookings => {
  const stubService = new StubServiceListBookings(cacheSingleton)
  return new RemoteListBookings('', stubService)
}
