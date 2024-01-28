import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate (input: Record<string, any>): Error {
    return input[this.field] !== input[this.valueToCompare]
      ? new InvalidFieldError(`${this.field}`)
      : null
  }
}
