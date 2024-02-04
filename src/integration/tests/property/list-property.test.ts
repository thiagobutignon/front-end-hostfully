import { ListPropertiesUsecase } from '@/domain/usecases'
import { cacheBookingSingleton } from '@/main/singleton'
import { makeRemoteListProperties } from '@/main/factories/data'

describe('ListPropertiesUsecase Integration Test', () => {
  let sut: ListPropertiesUsecase

  beforeEach(async () => {
    sut = makeRemoteListProperties()
  })

  afterEach(() => {
    jest.clearAllMocks()
    cacheBookingSingleton.clearCacheTestOnly()
  })
  test('should list bookings', async () => {
    const response = await sut.perform()

    expect(response).toBeDefined()
    expect(response).toBeTruthy()
    expect(response).toHaveLength(3)
  })
})
