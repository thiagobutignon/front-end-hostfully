import { CachePropertyRepository } from '@/application/repository'
import { listProperties } from '@/application/mock'
export const cacheSingleton = new CachePropertyRepository()
cacheSingleton.addPropertiesTestOnly(listProperties)

export default cacheSingleton
