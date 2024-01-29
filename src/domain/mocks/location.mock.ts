import { LocationModel } from '@/domain/models'
import { faker } from '@faker-js/faker'

export const locationModelMock = (): LocationModel => ({
  street: faker.location.street(),
  number: faker.number.int().toString(),
  city: faker.location.city(),
  country: faker.location.country()
})
