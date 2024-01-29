import { guestModelMock, propertyModelMock } from '@/domain/mocks'

import { Booking } from '@/domain/models'
import { faker } from '@faker-js/faker'

export const bookingModelMock = (): Booking.Model => ({
  id: faker.string.alpha(),
  propertyId: faker.string.alphanumeric(),
  totalPrice: faker.number.float().toString(),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  hostEmail: faker.internet.email(),
  guests: guestModelMock()
})

export const bookingParamsMock = (): Booking.Params => ({
  guestEmail: faker.internet.email(),
  propertyId: faker.string.alphanumeric(),
  guests: guestModelMock(),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  createdAt: faker.date.recent(),
  property: propertyModelMock()
})

export const bookindResultMock = (): Booking.Result => ({
  booking: Array.from({ length: 10 }, () => bookingModelMock())
})
