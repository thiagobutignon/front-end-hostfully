import { Booking } from '@/domain/models'
import { BookingCalculateTotalPrice } from '@/application/protocols'

export const calculateBooking = (
  bookingCalculator: BookingCalculateTotalPrice,
  params: Booking.Params | Booking.Model
): { totalPrice: number, numberOfNights: number } => {
  const { startDate, endDate } = params
  const { pricePerNight, serviceFee, cleaningFee } = params.property

  return bookingCalculator.execute({
    startDate,
    endDate,
    pricePerNight,
    serviceFee,
    cleaningFee
  })
}
