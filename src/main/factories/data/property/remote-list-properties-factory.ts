import { RemoteListProperties } from '@/data/usecases'
import { StubServiceListProperties } from '@/application/service'
import cachePropertiesSingleton from '@/main/singleton/cache-properties-singleton'

export const makeRemoteListProperties = (): RemoteListProperties => {
  const stubService = new StubServiceListProperties(cachePropertiesSingleton)
  return new RemoteListProperties('', stubService)
}
