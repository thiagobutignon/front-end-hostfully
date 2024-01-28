export class EmptyFieldError extends Error {
  constructor() {
    super('')
    this.name = 'EmptyFieldError'
  }
}