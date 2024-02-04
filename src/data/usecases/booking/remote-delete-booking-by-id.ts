import { HttpClient, HttpRequest, HttpStatusCode } from '@/data/protocols'
import { NotFoundError, UnexpectedError } from '@/domain/errors'

import { DeleteBookingByIdUsecase } from '@/domain/usecases'

export class RemoteDeleteBookingById implements DeleteBookingByIdUsecase {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<DeleteBookingByIdUsecase.Result>
  ) {}

  async perform (params: DeleteBookingByIdUsecase.Params): Promise<DeleteBookingByIdUsecase.Result> {
    const httpRequest: HttpRequest = {
      url: `${this.url}/${params.id}`,
      method: 'delete',
      body: params
    }

    const httpResponse = await this.httpClient.request(httpRequest)

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.notFound:
        throw new NotFoundError()
      default:
        throw new UnexpectedError()
    }
  }
}
