import { HttpClient, HttpRequest, HttpStatusCode } from '@/data/protocols'
import { NotFoundError, UnexpectedError } from '@/domain/errors'

import { UpdateBookingUsecase } from '@/domain/usecases'

export class RemoteUpdateBooking implements UpdateBookingUsecase {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<UpdateBookingUsecase.Result>
  ) {}

  async perform (params: UpdateBookingUsecase.Params): Promise<UpdateBookingUsecase.Result> {
    const httpRequest: HttpRequest = {
      url: `${this.url}/${params.id}`,
      method: 'put',
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
