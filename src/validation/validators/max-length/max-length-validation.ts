import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MaxLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly maxLength: number) {}

  validate (input: Record<string, any>): Error {
    if (input[this.field]?.length === this.maxLength) {
      return null
    } else {
      return new InvalidFieldError(`${this.field}`)
    }
  }
}
