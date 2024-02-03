import { LocalStorageAdapter } from '@/infra/cache'

beforeEach(() => {
  jest.spyOn(Storage.prototype, 'setItem')
  jest.spyOn(Storage.prototype, 'getItem')
  jest.spyOn(Storage.prototype, 'removeItem')
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('LocalStorageAdapter', () => {
  let sut: LocalStorageAdapter
  let key: string
  let value: object

  beforeEach(() => {
    sut = new LocalStorageAdapter()
    key = 'any_key'
    value = { any: 'value' }
  })

  describe('set', () => {
    it('should call localStorage.setItem with correct values', () => {
      sut.set(key, value)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
    })

    it('should call localStorage.removeItem if value is null', () => {
      sut.set(key, null)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(localStorage.removeItem).toHaveBeenCalledWith(key)
    })
  })

  describe('get', () => {
    it('should call localStorage.getItem with correct value', () => {
      const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
      const obj = sut.get(key)

      expect(obj).toEqual(value)
      expect(getItemSpy).toHaveBeenCalledWith(key)
    })

    it('should return null if key is not found', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(null)
      const obj = sut.get(key)

      expect(obj).toBeNull()
    })
  })
})
