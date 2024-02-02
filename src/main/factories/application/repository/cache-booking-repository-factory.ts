import { CacheBookingRepository } from '@/application/repository'

export const makeCacheBookingRepository = (): CacheBookingRepository => {
  return new CacheBookingRepository()
}
