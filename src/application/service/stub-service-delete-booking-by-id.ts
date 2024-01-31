import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'

import { BookingRepository } from '@/domain/repository'
import { DeleteBookingByIdUsecase } from '@/domain/usecases'

export class StubServiceDeleteBookingById implements HttpClient<DeleteBookingByIdUsecase.Result> {
  constructor (private readonly bookingsRepository: BookingRepository) {}

  async request (data: HttpRequest<DeleteBookingByIdUsecase.Params>): Promise<HttpResponse<DeleteBookingByIdUsecase.Result>> {
    try {
      const { id } = data.body
      const deleteResult = this.bookingsRepository.delete({ id })

      if (typeof deleteResult === 'object' && deleteResult.error) {
        return {
          statusCode: HttpStatusCode.notFound,
          body: { error: deleteResult.error }
        }
      }

      return {
        statusCode: HttpStatusCode.ok,
        body: true
      }
    } catch (error) {
      return {
        statusCode: HttpStatusCode.serverError,
        body: { error: 'Unexpected error occurred' }
      }
    }
  }
}
