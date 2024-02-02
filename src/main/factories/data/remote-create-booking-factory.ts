import { RemoteCreateBooking } from '@/data/usecases'
import { makeStubServiceCreateBooking } from '../application/service/stub-service-create-booking-factory'

export const makeRemoteCreateBooking = (): RemoteCreateBooking => {
  const stubService = makeStubServiceCreateBooking()
  return new RemoteCreateBooking('', stubService)
}
