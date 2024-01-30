import { BookingValidationService } from '@/application/validation/booking-validation-service'

describe('BookingValidationService', () => {
  let sut: BookingValidationService

  beforeEach(() => {
    sut = new BookingValidationService()
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
})
