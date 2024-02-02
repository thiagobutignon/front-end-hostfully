import { Booking } from '@/domain/models'
import { BookingRepository } from '@/domain/repository'
import { DateClient } from '@/data/protocols'
import { Validation } from '@/validation/protocols'
import { isWithinInterval } from 'date-fns'

export class BookingValidationService implements Validation {
  constructor (
    private readonly bookingsRepository: BookingRepository,
    private readonly dateClient: DateClient
  ) {}

  validate (fieldName: string, input: Record<string, any>): string {
    switch (fieldName) {
      case 'guests':
        return this.validateGuests(input)
      case 'booking':
        return this.validateDoubleBooking(input)

      default:
        return ''
    }
  }

  private validateGuests (input: Record<string, any>): string {
    const guests = input.guests
    const property = input.property

    if (!guests || !property) return 'Invalid input'

    if (guests.numberOfGuests > property.maxGuests || guests.numberOfGuests < 1) {
      return 'Invalid number of guests'
    }

    return ''
  }

  private validateDoubleBooking (input: Record<string, any>): string {
    const newBooking: Booking.Params = input.booking
    if (!newBooking?.startDate || !newBooking.endDate) return 'Invalid booking data'

    const dateValidationError = this.validateBookingDate(newBooking.startDate)
    if (dateValidationError) {
      return dateValidationError
    }

    const existingBookings: Booking.Model[] = this.bookingsRepository.getAll()

    const isDoubleBooked = existingBookings.some((booking: Booking.Model) => {
      const isTheSameId = booking.property.id === newBooking.property.id

      if (isTheSameId) {
        if (
          isWithinInterval(newBooking.startDate, { start: booking.startDate, end: booking.endDate }) ||
          isWithinInterval(newBooking.endDate, { start: booking.startDate, end: booking.endDate }) ||
          isWithinInterval(booking.startDate, { start: newBooking.startDate, end: newBooking.endDate })
        ) {
          return true
        }
      }
      return false
    })
    if (isDoubleBooked) {
      return 'This room is already booked for the selected dates'
    }

    return ''
  }

  private validateBookingDate (newBookingDate: Date): string {
    const today = this.dateClient.startOfDay(new Date())
    if (this.dateClient.isBefore(newBookingDate, today)) {
      return 'Cannot book a room for a past date'
    }
    return ''
  }
}
