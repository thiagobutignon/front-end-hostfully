import { makeRemoteCreateBooking, makeRemoteUpdateBooking } from '@/main/factories/data'

import { Booking } from '@/domain/models'
import { DateInfo } from '@/integration/helpers'
import { RemoteUpdateBooking } from '@/data/usecases'
import { cacheSingleton } from '@/main/singleton'
import { faker } from '@faker-js/faker'

const realBooking = (propertyId: string = '1', startDate: number = 1, endDate = 3, numberOfGuests: number = 1, maxGuests: number = 10): Booking.Params => {
  const date = new DateInfo()
  return {
    guestEmail: 'butignonthiago@gmail.com',
    guests: {
      numberOfGuests,
      guests: [{
        name: 'Thiago',
        email: 'butignonthiago@gmail.com'
      }]
    },
    property: {
      id: propertyId,
      name: 'string',
      location: {
        city: 'Sao Paulo',
        country: 'Brazil',
        number: '123',
        street: '5th avenue'
      },
      maxGuests,
      bedrooms: 10,
      beds: 10,
      image: [faker.image.urlPicsumPhotos()],
      pricePerNight: 100,
      cleaningFee: 100,
      serviceFee: 100,
      roomType: 'Room',
      status: 'Pending'
    },
    startDate: date.getStartDate(startDate),
    endDate: date.getEndDate(endDate),
    createdAt: date.getCurrentDate()
  }
}
describe('UpdateBookingUsecase Integration Test', () => {
  let sut: RemoteUpdateBooking

  beforeEach(async () => {
    sut = makeRemoteUpdateBooking()
    await makeRemoteCreateBooking().perform(realBooking())
  })

  afterEach(() => {
    jest.clearAllMocks()
    cacheSingleton.clearCacheTestOnly()
  })
  test('should update a booking', async () => {
    const params = cacheSingleton.getAll()
    const response = await sut.perform({
      ...params[0],
      startDate: new DateInfo().getStartDate(10),
      endDate: new DateInfo().getEndDate(20)
    })

    expect(response.booking).toBeDefined()
    expect(response).toBeTruthy()
  })
})
