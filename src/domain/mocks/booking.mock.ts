import { guestModelMock, propertyModelMock } from '@/domain/mocks'

import { Booking } from '@/domain/models'
import { DateInfo } from '@/integration/helpers'
import { faker } from '@faker-js/faker'

export const bookingModelMock = (
  id: string = faker.string.alphanumeric(),
  startDate: Date = new DateInfo().getStartDate(),
  endDate: Date = new DateInfo().getEndDate(),
  numberOfGuests: number = faker.number.int({ min: 1, max: 10 }),
  maxGuests: number = faker.number.int({ min: 11 })): Booking.Model => ({
  id,
  totalPrice: faker.number.float(),
  numberOfNights: faker.number.int(),
  startDate,
  endDate,
  hostEmail: faker.internet.email(),
  guests: guestModelMock(numberOfGuests),
  property: propertyModelMock(maxGuests, id),
  guestEmail: faker.internet.email()
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
