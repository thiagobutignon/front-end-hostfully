import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators'
import { faker } from '@faker-js/faker'

const makeSut = (field: string, minLength: number): MinLengthValidation =>
  new MinLengthValidation(field, minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 5)

    const error = sut.validate({ [field]: faker.string.alphanumeric(4) })

    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 5)

    const error = sut.validate({ [field]: faker.string.alphanumeric(5) })

    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exist in schema', () => {
    const sut = makeSut('any_field', 5)

    const error = sut.validate({
      invalidField: faker.string.alphanumeric(5)
    })

    expect(error).toBeFalsy()
  })
})
