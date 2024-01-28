import { EmptyFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class EmptyFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: Record<string, any>): Error {
    return input[this.field] ? null : new EmptyFieldError()
  }
}
