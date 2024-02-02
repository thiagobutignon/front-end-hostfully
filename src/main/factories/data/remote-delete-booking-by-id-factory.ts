import { RemoteDeleteBookingById } from '@/data/usecases'
import { StubServiceDeleteBookingById } from '@/application/service'
import { cacheSingleton } from '@/main/singleton'

export const makeRemoteDeleteBookingById = (): RemoteDeleteBookingById => {
  const stubService = new StubServiceDeleteBookingById(cacheSingleton)
  return new RemoteDeleteBookingById('', stubService)
}
