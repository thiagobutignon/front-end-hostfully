import { BookingCalculator, DatesCalculator } from '@/application/calculators'

import { BookingCalculateTotalPrice } from '@/application/protocols'
describe('BookingCalculator', () => {
  let sut: BookingCalculateTotalPrice

  beforeEach(() => {
    sut = new BookingCalculator(new DatesCalculator())
  })

  it('should correctly calculate the total price for a given period', () => {
    const params: BookingCalculateTotalPrice.Params = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-05'),
      pricePerNight: '100'
    }

    const result = sut.execute(params)

    expect(result.totalPrice).toBe('400.00')
    expect(result.numberOfNights).toBe(4)
  })

  it('should correctly calculate the total price for a 1-day booking', () => {
    const params: BookingCalculateTotalPrice.Params = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-01'),
      pricePerNight: '100'
    }

    const result = sut.execute(params)

    expect(result.totalPrice).toBe('100.00')
    expect(result.numberOfNights).toBe(1)
  })
})
