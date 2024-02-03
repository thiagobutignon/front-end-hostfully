import { BookingCalculator, DatesCalculator } from '@/application/calculators'

import { BookingCalculateTotalPrice } from '@/application/protocols'
import { DateError } from '@/domain/errors'

describe('BookingCalculator', () => {
  let sut: BookingCalculateTotalPrice

  beforeEach(() => {
    sut = new BookingCalculator(new DatesCalculator())
  })

  type TestCaseParams = {
    description: string
    startDate: string
    endDate: string
    pricePerNight: number
    cleaningFee?: number
    serviceFee?: number
  }

  type TestCaseResult = {
    description: string
    params: BookingCalculateTotalPrice.Params
    expectedTotalPrice: number
    expectedNumberOfNights: number
  }

  const createTestCase = (params: TestCaseParams): TestCaseResult => {
    const { startDate, endDate, pricePerNight, cleaningFee, serviceFee } = params
    const testParams: BookingCalculateTotalPrice.Params = { startDate: new Date(startDate), endDate: new Date(endDate), pricePerNight }

    if (cleaningFee !== undefined) testParams.cleaningFee = cleaningFee
    if (serviceFee !== undefined) testParams.serviceFee = serviceFee

    const expectedNumberOfNights = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24) || 1
    const expectedTotalPrice = (expectedNumberOfNights * pricePerNight) + (cleaningFee || 0) + (serviceFee || 0)

    return { description: params.description, params: testParams, expectedTotalPrice, expectedNumberOfNights }
  }

  const testCases = [
    createTestCase({
      description: 'calculate the total price for a given period',
      startDate: '2024-01-01',
      endDate: '2024-01-05',
      pricePerNight: 100.00
    }),
    createTestCase({
      description: 'calculate the total price for a 1-day booking',
      startDate: '2024-01-01',
      endDate: '2024-01-01',
      pricePerNight: 100
    }),
    createTestCase({
      description: 'calculate the total price with cleaning fee',
      startDate: '2024-01-01',
      endDate: '2024-01-01',
      pricePerNight: 100,
      cleaningFee: 100
    }),
    createTestCase({
      description: 'calculate the total price with service fee',
      startDate: '2024-01-01',
      endDate: '2024-01-01',
      pricePerNight: 100,
      serviceFee: 100
    }),
    createTestCase({
      description: 'calculate the total price with service fee and cleaning fee',
      startDate: '2024-01-01',
      endDate: '2024-01-01',
      pricePerNight: 100,
      cleaningFee: 100,
      serviceFee: 100
    })
  ]

  testCases.forEach(({ description, params, expectedTotalPrice, expectedNumberOfNights }) => {
    it(`should correctly ${description}`, () => {
      const result = sut.execute(params)
      expect(result.totalPrice).toBe(expectedTotalPrice)
      expect(result.numberOfNights).toBe(expectedNumberOfNights)
    })
  })

  test('should not calculate the total price and number of nights if the startDate is more recent than the end date', () => {
    const params: BookingCalculateTotalPrice.Params = {
      startDate: new Date('2024-01-02'),
      endDate: new Date('2024-01-01'),
      pricePerNight: 100.00
    }

    expect(() => sut.execute(params)).toThrow(DateError)
  })
})
