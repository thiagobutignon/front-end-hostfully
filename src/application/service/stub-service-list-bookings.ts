import { HttpClient, HttpResponse, HttpStatusCode } from '@/data/protocols'

import { BookingRepository } from '@/domain/repository'
import { ListBookingsUsecase } from '@/domain/usecases'

export class StubServiceListBookings implements HttpClient<ListBookingsUsecase.Result> {
  constructor (private readonly bookingsRepository: BookingRepository) {}
  async request (): Promise<HttpResponse<ListBookingsUsecase.Result>> {
    try {
      const bookings = this.bookingsRepository.getAll()
      return {
        statusCode: HttpStatusCode.ok,
        body: { booking: bookings }
      }
    } catch (error) {
      return {
        statusCode: HttpStatusCode.badRequest,
        body: { error: 'An error occurred while listing bookings' }
      }
    }
  }
}
