import { bookingModelMock, createBookindResultMock } from '@/domain/mocks'

import { Booking } from '@/domain/models'
import { BookingRepository } from '@/domain/repository'
import { BookingValidationService } from '@/application/validation/booking-validation-service'
import { DateComparer } from '@/data/protocols'
import { DateFnsAdapter } from '@/infra/date'

describe('BookingValidationService', () => {
  let sut: BookingValidationService
  let mockBookingsRepository: jest.Mocked<BookingRepository>
  let mockDateComparer: DateComparer

  beforeEach(() => {
    mockBookingsRepository = {
      add: jest.fn().mockReturnValue(createBookindResultMock()),
      getAll: jest.fn() as jest.Mock<Booking.Model[]>
    }
    mockDateComparer = {
      isSameDay: jest.fn().mockImplementation((entryDate, dateToCompare) => new DateFnsAdapter().isSameDay(entryDate, dateToCompare))
    }
    sut = new BookingValidationService(mockBookingsRepository, mockDateComparer)
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
        'This room is already booked for the selected dates',
        'Overlaps with existing booking'],
      [{
        booking: {
          property: { id: 'property1' },
          startDate: new Date('2024-01-03'),
          endDate: new Date('2024-01-05')
        }
      },
      'This room is already booked for the selected dates',
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
