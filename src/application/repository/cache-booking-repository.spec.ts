import { BookingRepository } from '@/domain/repository'
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

    it('should not update anything if booking does not exist', () => {
      const result = sut.update({ id: 'non-existent-id', totalPrice: 300 })
      expect(result.error).toBe('Booking not found')
      expect(sut.getAll()).toHaveLength(0)
    })
  })

  describe('delete', () => {
    it('should delete a booking if found', () => {
      const mock = bookingModelMock()
      sut.add(mock)

      const deleteResult = sut.delete({ id: mock.id })

      expect(deleteResult).toBeTruthy()
      expect(sut.getAll()).toHaveLength(0)
    })

    it('should return false if booking not found', () => {
      const result = sut.delete({ id: 'non-existent-id' })

      expect(result).toBeFalsy()
      expect(sut.getAll()).toHaveLength(0)
    })

    it('should not delete anything if booking does not exist', () => {
      sut.add(bookingModelMock())
      const result: BookingRepository.DeleteResult = sut.delete({ id: 'non-existent-id' })

      expect(result).toBeFalsy()
      expect(sut.getAll()).toHaveLength(1)
    })
  })
})
