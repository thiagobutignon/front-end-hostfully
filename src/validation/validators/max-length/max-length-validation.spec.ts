import { InvalidFieldError } from '@/validation/errors'
import { MaxLengthValidation } from '@/validation/validators'
import { faker } from '@faker-js/faker'

const makeSut = (field: string, maxLength: number): MaxLengthValidation =>
  new MaxLengthValidation(field, maxLength)

describe('MaxLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 5)
    const error = sut.validate({ [field]: faker.string.alpha(4) })
    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 5)
    const error = sut.validate({ [field]: faker.string.alpha(5) })
    expect(error).toBeFalsy()
  })

  test('Should return truthy if field does not exist in schema', () => {
    const sut = makeSut('any_field', 5)
    const error = sut.validate({
      invalidField: faker.string.alpha(5)
    })
    expect(error).toBeTruthy()
  })
})
