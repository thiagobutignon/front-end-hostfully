import { PropertyModel } from '@/domain/models'
import { faker } from '@faker-js/faker'
import { locationModelMock } from '@/domain/mocks/location.mock'

export const propertyModelMock = (maxGuests: number = faker.number.int({ min: 11 })): PropertyModel => ({
  id: faker.string.alphanumeric(),
  name: faker.person.fullName(),
  location: locationModelMock(),
  maxGuests,
  bedrooms: faker.number.int(),
  beds: faker.number.int(),
  image: Array.from({ length: 10 }, () => faker.image.urlPicsumPhotos()),
  pricePerNight: faker.number.float(),
  cleaningFee: faker.number.float(),
  serviceFee: faker.number.float(),
  roomType: faker.helpers.arrayElement(['Room', 'House', 'Apartment', 'Shared']),
  status: faker.helpers.arrayElement(['Pending' , 'Cancelled' , 'Waiting for Payment' , 'Paid' , 'Completed'])
})
