import { Validation } from '@/validation/protocols'

export class BookingValidationService implements Validation {
  validate (fieldName: string, input: Record<string, any>): string {
    switch (fieldName) {
      case 'guests':
        return this.validateGuests(input)

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
}
