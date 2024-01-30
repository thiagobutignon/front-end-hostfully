import { guestModelMock, propertyModelMock } from '@/domain/mocks'

import { Booking } from '@/domain/models'
import { faker } from '@faker-js/faker'

export const bookingModelMock = (
  id: string = faker.string.alphanumeric(),
  startDate: Date = faker.date.recent(),
  endDate: Date = faker.date.future()): Booking.Model => ({
  id: faker.string.alpha(),
  totalPrice: faker.number.float(),
  numberOfNights: faker.number.int(),
  startDate,
  endDate,
  hostEmail: faker.internet.email(),
  guests: guestModelMock(),
  property: propertyModelMock(faker.number.int({ min: 11 }), id)
})

export const createBookingParamsMock = (numberOfGuests: number = faker.number.int(), maxGuests: number = faker.number.int(), startDate: Date = faker.date.recent()): Booking.Params => ({
  guestEmail: faker.internet.email(),
  guests: guestModelMock(numberOfGuests),
  startDate,
  endDate: faker.date.future(),
  createdAt: faker.date.recent(),
  property: propertyModelMock(maxGuests)
})

export const createBookingsResultMock = (): Booking.Result => ({
  booking: Array.from({ length: 10 }, () => bookingModelMock())
})
