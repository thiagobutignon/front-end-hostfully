export class BookingError extends Error {
  constructor () {
    super('This room is already booked for the selected dates')
    this.name = 'BookingError'
  }
}
