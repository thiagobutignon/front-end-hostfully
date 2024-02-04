import { listPropertiesMock, propertyModelMock } from '@/domain/mocks'

import { CachePropertyRepository } from '@/application/repository'

describe('CachePropertyRepository', () => {
  let sut: CachePropertyRepository

  beforeEach(() => {
    sut = new CachePropertyRepository()
  })

  describe('getAll', () => {
    test('should return all properties', () => {
      const mock = propertyModelMock()
      sut.addPropertiesTestOnly([mock])
      sut.getAll()

      const result = sut.getAll()

      expect(result).toEqual([mock])
      expect(result).toHaveLength(1)
    })
  })

  describe('addPropertiesTestOnly', () => {
    test('should add properties in the cache', () => {
      sut.addPropertiesTestOnly(listPropertiesMock())

      expect(sut.getAll()).toHaveLength(10)
    })
  })
})
