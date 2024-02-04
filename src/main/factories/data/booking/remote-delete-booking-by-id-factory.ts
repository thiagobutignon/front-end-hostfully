import { RemoteDeleteBookingById } from '@/data/usecases'
import { StubServiceDeleteBookingById } from '@/application/service'
import { cacheBookingSingleton } from '@/main/singleton'

export const makeRemoteDeleteBookingById = (): RemoteDeleteBookingById => {
  const stubService = new StubServiceDeleteBookingById(cacheBookingSingleton)
  return new RemoteDeleteBookingById('', stubService)
}
