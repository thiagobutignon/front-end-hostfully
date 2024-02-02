import { Booking } from '@/domain/models'
import { BookingValidationService } from '@/application/validation'
import { CacheBookingRepository } from '@/application/repository'
import { DateFnsAdapter } from '@/infra/date'
import { DateInfo } from '@/integration/helpers'
import { RemoteCreateBooking } from '@/data/usecases'
import { StubServiceCreateBooking } from '@/application/service'
import { faker } from '@faker-js/faker'
import { makeBookingCalculator } from '@/main/factories'
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
  test('should create a booking', async () => {
    const sut = makeRemoteCreateBooking()

    const response = await sut.perform(realBooking())

    expect(response.booking).toBeDefined()
    expect(response).toBeTruthy()
    expect(response.booking[0].id).toBeTruthy()
  })

  test('should not add two bookings in the same day', async () => {
    const bookingData1 = realBooking('1', 1, 2, 1)
    const bookingData2 = realBooking('1', 1, 2, 7)
    const bookingCalculator = makeBookingCalculator()
    const cache = new CacheBookingRepository()
    const dateAdapter = new DateFnsAdapter()
    const validation = new BookingValidationService(cache, dateAdapter)
    const stubService = new StubServiceCreateBooking(bookingCalculator, cache, validation)

    const sut = new RemoteCreateBooking('', stubService)
    const response1 = await sut.perform(bookingData1)

    expect(response1).toBeDefined()
    expect(cache.getAll()).toHaveLength(1)

    await expect(sut.perform(bookingData2)).rejects.toThrow('This room is already booked for the selected dates')
  })
})
