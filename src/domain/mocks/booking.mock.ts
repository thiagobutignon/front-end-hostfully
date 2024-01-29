import { guestModelMock, propertyModelMock } from '@/domain/mocks'

import { Booking } from '@/domain/models'
import { faker } from '@faker-js/faker'

export const bookingModelMock = (): Booking.Model => ({
  id: faker.string.alpha(),
  totalPrice: faker.number.float(),
  numberOfNights: faker.number.int(),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  hostEmail: faker.internet.email(),
  guests: guestModelMock(),
  property: propertyModelMock()
})

export const createBookingParamsMock = (numberOfGuests: number = faker.number.int(), maxGuests: number = faker.number.int()): Booking.Params => ({
  guestEmail: faker.internet.email(),
  guests: guestModelMock(numberOfGuests),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  createdAt: faker.date.recent(),
  property: propertyModelMock(maxGuests)
})

export const createBookindResultMock = (): Booking.Result => ({
  booking: Array.from({ length: 10 }, () => bookingModelMock())
})
