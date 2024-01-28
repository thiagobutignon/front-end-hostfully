import {
  CompareFieldsValidation,
  EmailValidation,
  EmptyFieldValidation,
  MaxLengthValidation,
  MinLengthValidation,
  RequiredFieldValidation
} from '@/validation/validators'

import { FieldValidation } from '@/validation/protocols'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  sameAs (fieldToCompare: string): ValidationBuilder {
    this.validations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare)
    )
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  empty (): ValidationBuilder {
    this.validations.push(new EmptyFieldValidation(this.fieldName))
    return this
  }

  max (length: number): ValidationBuilder {
    this.validations.push(new MaxLengthValidation(this.fieldName, length))
    return this
  }

  min (length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
