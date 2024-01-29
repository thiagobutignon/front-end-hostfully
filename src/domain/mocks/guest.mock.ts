import { Guest } from '@/domain/models'
import { faker } from '@faker-js/faker'

export const guestModelMock = (numberOfGuests: number = faker.number.int({ min: 1, max: 10 })): Guest.Model => ({
  numberOfGuests,
  guests: Array.from({ length: 10 }, () => guestInfoMock())
})

const guestInfoMock = (): Guest.Info => ({
  name: faker.person.fullName(),
  email: faker.internet.email()
})
