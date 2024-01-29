import { BookingCalculateTotalPrice } from '@/application/protocols'

export class BookingCalculator implements BookingCalculateTotalPrice {
  execute (params: BookingCalculateTotalPrice.Params): BookingCalculateTotalPrice.Result {
    const start = new Date(params.startDate)
    const end = new Date(params.endDate)
    const nightlyRate = parseFloat(params.pricePerNight)

    const timeDiff = end.getTime() - start.getTime()
    const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24))
    const totalPrice = (numberOfNights * nightlyRate).toFixed(2).toString()
    return {
      numberOfNights,
      totalPrice
    }
  }
}
