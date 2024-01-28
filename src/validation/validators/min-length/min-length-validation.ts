import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (input: Record<string, any>): Error {
    return input[this.field]?.length < this.minLength
      ? new InvalidFieldError(`${this.field}`)
      : null
  }
}
