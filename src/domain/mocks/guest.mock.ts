import { Guest } from '@/domain/models'
import { faker } from '@faker-js/faker'

export const guestModelMock = (): Guest.Model => ({
  numberOfGuests: faker.number.int(),
  guests: Array.from({ length: 10 }, () => guestInfoMock())
})

const guestInfoMock = (): Guest.Info => ({
  name: faker.person.fullName(),
  email: faker.internet.email()
})
