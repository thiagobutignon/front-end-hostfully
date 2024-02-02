import { Booking } from '@/domain/models'
import { DateInfo } from '@/integration/helpers'
import { RemoteCreateBooking } from '@/data/usecases'
import { cacheSingleton } from '@/main/singleton'
import { faker } from '@faker-js/faker'
import { makeRemoteCreateBooking } from '@/main/factories/data'

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
describe('CreateBookingUsecase Integration Test', () => {
  let sut: RemoteCreateBooking
  beforeEach(() => {
    sut = makeRemoteCreateBooking()
  })

  afterEach(() => {
    jest.clearAllMocks()
    cacheSingleton.clearCacheTestOnly()
  })
  test('should create a booking', async () => {
    const response = await sut.perform(realBooking())

    expect(response.booking).toBeDefined()
    expect(response).toBeTruthy()
    expect(response.booking[0].id).toBeTruthy()
  })

  test('should not add two bookings in the same day', async () => {
    const bookingData1 = realBooking('1', 1, 2, 1)
    const bookingData2 = realBooking('1', 1, 2, 7)

    const response1 = await sut.perform(bookingData1)

    expect(response1).toBeDefined()
    expect(cacheSingleton.getAll()).toHaveLength(1)

    await expect(sut.perform(bookingData2)).rejects.toThrow(new Error('This room is already booked for the selected dates'))
  })
})
