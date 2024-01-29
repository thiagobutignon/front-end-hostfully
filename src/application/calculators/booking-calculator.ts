import { BookingCalculateTotalPrice, CalculateNumberOfNights } from '@/application/protocols'

export class BookingCalculator implements BookingCalculateTotalPrice {
  constructor (private readonly datesCalculator: CalculateNumberOfNights) {}
  execute (params: BookingCalculateTotalPrice.Params): BookingCalculateTotalPrice.Result {
    let totalPrice: number
    const { startDate, endDate, pricePerNight, cleaningFee, serviceFee } = params
    const numberOfNights = this.datesCalculator.execute({ startDate, endDate })

    totalPrice = Number((numberOfNights * pricePerNight).toFixed(2))

    if (cleaningFee) {
      totalPrice += cleaningFee
    }

    if (serviceFee) {
      totalPrice += serviceFee
    }

    return {
      numberOfNights,
      totalPrice
    }
  }
}
