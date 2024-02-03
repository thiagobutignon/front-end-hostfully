import { isBefore, isSameDay, isWithinInterval, startOfDay } from 'date-fns'

import { DateFnsAdapter } from '@/infra/date/date-fns-adapter'

jest.mock('date-fns', () => ({
  isSameDay: jest.fn(),
  isBefore: jest.fn(),
  isWithinInterval: jest.fn(),
  startOfDay: jest.fn()
}))

describe('DateFnsAdapter', () => {
  const sut = new DateFnsAdapter()

  describe('isSameDay', () => {
    test('should call isSameDay from date-fns with correct parameters', () => {
      const date1 = new Date()
      const date2 = new Date()
      sut.isSameDay(date1, date2)
      expect(isSameDay).toHaveBeenCalledWith(date1, date2)
    })
  })

  describe('isBefore', () => {
    test('should call isBefore from date-fns with correct parameters', () => {
      const date1 = new Date()
      const date2 = new Date()
      sut.isBefore(date1, date2)
      expect(isBefore).toHaveBeenCalledWith(date1, date2)
    })
  })

  describe('isWithinInterval', () => {
    test('should call isWithinInterval from date-fns with correct parameters', () => {
      const date = new Date()
      const interval = { start: new Date(), end: new Date() }
      sut.isWithinInterval(date, interval)
      expect(isWithinInterval).toHaveBeenCalledWith(date, interval)
    })
  })

  describe('startOfDay', () => {
    test('should call startOfDay from date-fns with correct parameters', () => {
      const date = new Date()
      sut.startOfDay(date)
      expect(startOfDay).toHaveBeenCalledWith(date)
    })
  })
})
