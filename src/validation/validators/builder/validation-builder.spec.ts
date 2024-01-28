import {
  CompareFieldsValidation,
  EmailValidation,
  EmptyFieldValidation,
  MaxLengthValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationBuilder as sut
} from '@/validation/validators'

import { faker } from '@faker-js/faker'

describe('ValidationBuilder', () => {
  describe('CompareFieldValidation', () => {
    test('Should return CompareFieldValidation', () => {
      const field = faker.database.column()
      const fieldToCompare = faker.database.column()
      const validations = sut.field(field).sameAs(fieldToCompare).build()
      expect(validations).toEqual([
        new CompareFieldsValidation(field, fieldToCompare)
      ])
    })
  })

  describe('EmailValidation', () => {
    test('Should return EmailValidation', () => {
      const field = faker.database.column()
      const validations = sut.field(field).email().build()
      expect(validations).toEqual([new EmailValidation(field)])
    })
  })

  describe('EmptyVieldValidation', () => {
    test('Should return EmptyVieldValidation', () => {
      const field = faker.database.column()
      const validations = sut.field(field).empty().build()
      expect(validations).toEqual([new EmptyFieldValidation(field)])
    })
  })

  describe('MaxLengthValidation', () => {
    test('Should return MaxLengthValidation', () => {
      const field = faker.database.column()
      const length = faker.number.int({ min: 10, max: 12 })
      const validations = sut.field(field).max(length).build()
      expect(validations).toEqual([new MaxLengthValidation(field, length)])
    })
  })

  describe('MinLengthValidation', () => {
    test('Should return MinLengthValidation', () => {
      const field = faker.database.column()
      const length = faker.number.int({ min: 10, max: 12 })
      const validations = sut.field(field).min(length).build()
      expect(validations).toEqual([new MinLengthValidation(field, length)])
    })
  })

  describe('RequiredFieldValidation', () => {
    test('Should return RequiredFieldValidation', () => {
      const field = faker.database.column()
      const validations = sut.field(field).required().build()
      expect(validations).toEqual([new RequiredFieldValidation(field)])
    })
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.number.int({ min: 10, max: 12 })
    const validations = sut.field(field).required().min(length).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field)
    ])
  })
})
