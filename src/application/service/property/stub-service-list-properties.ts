import { HttpClient, HttpResponse, HttpStatusCode } from '@/data/protocols'

import { ListPropertiesUsecase } from '@/domain/usecases'
import { PropertyRepository } from '@/domain/repository'

export class StubServiceListProperties
implements HttpClient<ListPropertiesUsecase.Result> {
  constructor (private readonly propertyRepository: PropertyRepository) {}
  async request (): Promise<HttpResponse<ListPropertiesUsecase.Result>> {
    const properties = this.propertyRepository.getAll()
    return {
      statusCode: HttpStatusCode.ok,
      body: properties
    }
  }
}
