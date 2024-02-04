import { PropertyRepository } from '@/domain/repository'

export class CachePropertyRepository implements PropertyRepository {
  private readonly properties: PropertyRepository.Result = []

  public getAll (): PropertyRepository.Result {
    return this.properties
  }

  public addPropertiesTestOnly (params: PropertyRepository.Result): void {
    params.forEach((property) => this.properties.push(property))
  }
}
