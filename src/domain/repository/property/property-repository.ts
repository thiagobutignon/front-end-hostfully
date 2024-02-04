import { PropertyModel } from '@/domain/models'

export interface PropertyRepository {
  getAll: () => PropertyRepository.Result
}

export namespace PropertyRepository {
  export type Result = PropertyModel[]
}
