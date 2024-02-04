import { HttpClient, HttpStatusCode } from '@/data/protocols'
import {
  InvalidCredentialError,
  NotFoundError,
  UnexpectedError
} from '@/domain/errors'

import { ListPropertiesUsecase } from '@/domain/usecases'

export class RemoteListProperties implements ListPropertiesUsecase {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async perform (): Promise<ListPropertiesUsecase.Result> {
    const response = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialError()
      case HttpStatusCode.notFound:
        throw new NotFoundError()
      default:
        throw new UnexpectedError()
    }
  }
}
