import { CacheBookingRepository } from '@/application/repository'
import { bookingModelMock } from '@/domain/mocks'

describe('CacheBookingRepository', () => {
  let sut: CacheBookingRepository

  beforeEach(() => {
    sut = new CacheBookingRepository()
  })

  describe('add', () => {
    it('should add a booking and return the updated list', () => {
      const mock = bookingModelMock()

      const result = sut.add(mock)

      expect(result).toEqual([mock])
      expect(result).toHaveLength(1)
    })
  })

  describe('getAll', () => {
    it('should return all bookings', () => {
      const mock = bookingModelMock()
      sut.add(mock)

      const result = sut.getAll()

      expect(result).toEqual([mock])
      expect(result).toHaveLength(1)
    })
  })

  describe('update', () => {
    it('should update a booking if found', () => {
      const mock = bookingModelMock()
      sut.add(mock)
      const updatedBooking = { ...mock, totalPrice: 200 }

      const updateResult = sut.update(updatedBooking)

      expect(updateResult.booking).toContainEqual(updatedBooking)
    })

    it('should return an error if booking not found', () => {
      const mock = bookingModelMock()

      const updateResult = sut.update({ ...mock, id: 'non-existent-id' })

      expect(updateResult.error).toBe('Booking not found')
    })
  })
})
