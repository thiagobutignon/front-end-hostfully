import { PropertyModel } from '@/domain/models'

export interface ListPropertiesUsecase {
  perform: () => Promise<ListPropertiesUsecase.Result>
}

export namespace ListPropertiesUsecase {
  export type Result = PropertyModel[]
}
