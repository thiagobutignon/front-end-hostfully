import { bookingModelMock, createBookingsResultMock } from '@/domain/mocks'

import { Booking } from '@/domain/models'
import { BookingError } from '@/domain/errors'
import { BookingRepository } from '@/domain/repository'
import { BookingValidationService } from '@/application/validation/booking-validation-service'
import { DateClient } from '@/data/protocols'
import { DateFnsAdapter } from '@/infra/date'

describe('BookingValidationService', () => {
  let sut: BookingValidationService
  let mockBookingsRepository: jest.Mocked<BookingRepository>
  let mockDateClient: DateClient
  let dateFnsAdapter: DateFnsAdapter

  beforeEach(() => {
    mockBookingsRepository = {
      add: jest.fn().mockReturnValue(createBookingsResultMock()),
      getAll: jest.fn() as jest.Mock<Booking.Model[]>,
      update: jest.fn() as jest.Mock<BookingRepository.UpdateResult>,
      delete: jest.fn() as jest.Mock<BookingRepository.DeleteResult>
    }
    dateFnsAdapter = new DateFnsAdapter()
    mockDateClient = {
      isSameDay: jest.fn().mockImplementation((entryDate, dateToCompare) => dateFnsAdapter.isSameDay(entryDate, dateToCompare)),
      isBefore: jest.fn().mockImplementation((dateToCheck, dateToCompare) => dateFnsAdapter.isBefore(dateToCheck, dateToCompare)),
      isWithinInterval: jest.fn().mockImplementation((date, interval) => dateFnsAdapter.isWithinInterval(date, interval)),
      startOfDay: jest.fn().mockImplementation((date) => dateFnsAdapter.startOfDay(date))
    }
    sut = new BookingValidationService(mockBookingsRepository, mockDateClient)
  })

  describe('validate guests', () => {
    test.each([
      [{ guests: { numberOfGuests: 5 }, property: { maxGuests: 10 } }, ''],
      [{ guests: { numberOfGuests: 11 }, property: { maxGuests: 10 } }, 'Invalid number of guests'],
      [{ guests: { numberOfGuests: 0 }, property: { maxGuests: 10 } }, 'Invalid number of guests'],
      [{}, 'Invalid input']
    ])('when input is %p, returns %p', (input, expected) => {
      const result = sut.validate('guests', input)
      expect(result).toBe(expected)
    })
  })

  describe('validate double booking', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(new Date('2024-01-01').getTime())

      mockBookingsRepository.getAll.mockReturnValue(
        [
          bookingModelMock('property1', new Date('2024-01-02'), new Date('2024-01-03')),
          bookingModelMock('property1', new Date('2024-01-03'), new Date('2024-01-05'))
        ]
      )
    })

    afterEach(() => {
      jest.useRealTimers()
    })
    test.each([
      [
        {
          booking: {
            property: { id: 'property1' },
            startDate: new Date('2024-01-02'),
            endDate: new Date('2024-01-07')
          }
        },
        new BookingError().message,
        'Overlaps with existing booking'],
      [{
        booking: {
          property: { id: 'property1' },
          startDate: new Date('2024-01-03'),
          endDate: new Date('2024-01-05')
        }
      },
      new BookingError().message,
      'Starts within an existing booking'],
      [{
        booking: {
          property: { id: 'property1' },
          startDate: new Date('2024-01-06'),
          endDate: new Date('2024-01-07')
        }
      },
      '',
      'No overlap with existing bookings'],
      [{
        booking: {
          property: { id: 'property3' },
          startDate: new Date('2024-01-02'),
          endDate: new Date('2024-01-03')
        }
      },
      '',
      'Different property, no conflict']
    ])('when booking for %s, expect %s (%s)', (input, expected, description) => {
      const result = sut.validate('booking', input)
      expect(result).toBe(expected)
    })

    it('should not allow booking a room for a past date', () => {
      const pastDate = new Date('2023-01-01')
      const result = sut.validate('booking', {
        booking: {
          property: { id: 'property1' },
          startDate: pastDate,
          endDate: new Date('2023-01-02')
        }
      })
      expect(result).toBe('Cannot book a room for a past date')
    })
  })
})
