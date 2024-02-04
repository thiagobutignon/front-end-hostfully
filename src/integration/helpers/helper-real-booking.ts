import { Booking } from '@/domain/models'
import { DateInfo } from '@/integration/helpers/date-info'
import { faker } from '@faker-js/faker'

export const realBooking = (
  propertyId: string = '1',
  startDate: number = 1,
  endDate = 3,
  numberOfGuests: number = 1,
  maxGuests: number = 10
): Booking.Params => {
  const date = new DateInfo()
  return {
    guestEmail: 'butignonthiago@gmail.com',
    guests: {
      numberOfGuests,
      guests: [
        {
          name: 'Thiago',
          email: 'butignonthiago@gmail.com'
        }
      ]
    },
    property: {
      id: propertyId,
      description: 'string',
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
