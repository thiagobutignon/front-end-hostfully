import { BookingRepository } from '@/domain/repository'

export class CacheBookingRepository implements BookingRepository {
  private readonly bookings: BookingRepository.Result = []

  public add (params: BookingRepository.Params): BookingRepository.Result {
    this.bookings.push(params)
    return this.bookings
  }

  public getAll (): BookingRepository.Result {
    return this.bookings
  }
}
