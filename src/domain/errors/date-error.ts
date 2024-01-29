export class DateError extends Error {
  constructor () {
    super('Start date cannot be more recent than end date')
    this.name = 'DateError'
  }
}
