import { HttpStatusCode } from '@/data/protocols'
import { PropertyModel } from '@/domain/models'
import { PropertyRepository } from '@/domain/repository'
import { StubServiceListProperties } from '@/application/service'
import { listPropertiesMock } from '@/domain/mocks'

describe('StubServiceListProperties', () => {
  let sut: StubServiceListProperties
  let mockPropertyRepository: jest.Mocked<PropertyRepository>
  let mockProperties: PropertyModel[]

  beforeEach(() => {
    mockProperties = listPropertiesMock()
    mockPropertyRepository = {
      getAll: jest.fn().mockReturnValue(mockProperties)
    }
    sut = new StubServiceListProperties(mockPropertyRepository)
  })

  test('should return a list of properties with status code 200', async () => {
    const httpResponse = await sut.request()

    expect(httpResponse.statusCode).toBe(HttpStatusCode.ok)
    expect(httpResponse.body).toEqual(mockProperties)
  })
})
