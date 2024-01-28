import { EmptyFieldError } from '@/validation/errors'
import { EmptyFieldValidation } from '@/validation/validators'
import { faker } from '@faker-js/faker'

const makeSut = (field: string): EmptyFieldValidation =>
  new EmptyFieldValidation(field)

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new EmptyFieldError())
  })

  test('Should retrun falsy if field is not empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.string.alpha() })
    expect(error).toBeFalsy()
  })
})
