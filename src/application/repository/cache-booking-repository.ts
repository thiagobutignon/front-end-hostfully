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

  public update (params: BookingRepository.Params): BookingRepository.UpdateResult {
    const index = this.bookings.findIndex(booking => booking.id === params.id)
    if (index !== -1) {
      this.bookings[index] = { ...this.bookings[index], ...params }
      return { booking: this.bookings }
    }
    return { error: 'Booking not found' }
  }

  public delete (params: BookingRepository.DeleteParams): BookingRepository.DeleteResult {
    const index = this.bookings.findIndex(booking => booking.id === params.id)
    if (index === -1) {
      return { error: 'Booking not found' }
    }
    this.bookings.splice(index, 1)
  }
}
