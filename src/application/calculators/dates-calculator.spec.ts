import { CalculateNumberOfNights } from '@/application/protocols'
import { DateError } from '@/domain/errors'
import { DatesCalculator } from '@/application/calculators'

describe('DatesCalculator', () => {
  let sut: CalculateNumberOfNights

  beforeEach(() => {
    sut = new DatesCalculator()
  })

  it('should correctly calculate number of days for a period', () => {
    const params: CalculateNumberOfNights.Params = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-05')
    }

    const result = sut.execute(params)

    expect(result).toBe(4)
  })

  it('should correctly calculate the number of days when startDate and endDate are equal', () => {
    const params: CalculateNumberOfNights.Params = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-01')
    }

    const result = sut.execute(params)

    expect(result).toBe(1)
  })
  it('should throw an error when the startDate is more recent than the endDate', () => {
    const params: CalculateNumberOfNights.Params = {
      startDate: new Date('2024-01-02'),
      endDate: new Date('2024-01-01')
    }

    expect(() => sut.execute(params)).toThrow(DateError)
  })
})
