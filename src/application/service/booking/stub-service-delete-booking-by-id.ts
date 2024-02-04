import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'

import { BookingRepository } from '@/domain/repository'
import { DeleteBookingByIdUsecase } from '@/domain/usecases'

export class StubServiceDeleteBookingById implements HttpClient<DeleteBookingByIdUsecase.Result> {
  constructor (private readonly bookingsRepository: BookingRepository) {}

  async request (data: HttpRequest<DeleteBookingByIdUsecase.Params>): Promise<HttpResponse<DeleteBookingByIdUsecase.Result>> {
    try {
      const { id } = data.body
      const deleteResult = this.bookingsRepository.delete({ id })

      if (deleteResult) {
        return {
          statusCode: HttpStatusCode.ok,
          body: true
        }
      }

      return {
        statusCode: HttpStatusCode.notFound,
        body: false
      }
    } catch (error) {
      return {
        statusCode: HttpStatusCode.serverError,
        body: { error: 'Unexpected error occurred' }
      }
    }
  }
}
