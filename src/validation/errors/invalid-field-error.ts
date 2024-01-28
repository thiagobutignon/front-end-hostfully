export class InvalidFieldError extends Error {
  constructor(fieldLabel: string) {
    super(`Field ${fieldLabel} is invalid`)
    this.name = 'InvalidFieldError'
  }
}