import { BookingCalculateTotalPrice, CalculateNumberOfNights } from '@/application/protocols'

export class BookingCalculator implements BookingCalculateTotalPrice {
  constructor (private readonly datesCalculator: CalculateNumberOfNights) {}
  execute (params: BookingCalculateTotalPrice.Params): BookingCalculateTotalPrice.Result {
    const { startDate, endDate, pricePerNight } = params
    const numberOfNights = this.datesCalculator.execute({ startDate, endDate })

    const nightlyRate = parseFloat(pricePerNight)

    const totalPrice = (numberOfNights * nightlyRate).toFixed(2).toString()
    return {
      numberOfNights,
      totalPrice
    }
  }
}
