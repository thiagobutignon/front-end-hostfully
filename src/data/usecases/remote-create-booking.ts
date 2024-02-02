import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { InvalidCredentialError, NotFoundError, UnexpectedError } from '@/domain/errors'

import { CreateBookingUsecase } from '@/domain/usecases'

export class RemoteCreateBooking implements CreateBookingUsecase {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async perform (params: CreateBookingUsecase.Params): Promise<CreateBookingUsecase.Result> {
    const response = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialError()
      case HttpStatusCode.notFound:
        throw new NotFoundError()
      case HttpStatusCode.conflict:
        if (response.body.error === 'This room is already booked for the selected dates') {
          throw new Error('This room is already booked for the selected dates')
        }
        throw new Error()
      default:
        throw new UnexpectedError()
    }
  }
}
