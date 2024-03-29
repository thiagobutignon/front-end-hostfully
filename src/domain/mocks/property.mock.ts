import { PropertyModel } from '@/domain/models'
import { faker } from '@faker-js/faker'
import { locationModelMock } from '@/domain/mocks/location.mock'

export const propertyModelMock = (
  maxGuests: number = faker.number.int({ min: 11 }),
  id: string = faker.string.alphanumeric()
): PropertyModel => ({
  id,
  name: faker.person.fullName(),
  description: faker.lorem.sentence(),
  location: locationModelMock(),
  maxGuests,
  bedrooms: faker.number.int(),
  beds: faker.number.int(),
  image: Array.from({ length: 10 }, () => faker.image.urlPicsumPhotos()),
  pricePerNight: faker.number.float(),
  cleaningFee: faker.number.float(),
  serviceFee: faker.number.float(),
  roomType: faker.helpers.arrayElement([
    'Room',
    'House',
    'Apartment',
    'Shared'
  ]),
  status: faker.helpers.arrayElement([
    'Pending',
    'Cancelled',
    'Waiting for Payment',
    'Paid',
    'Completed'
  ])
})

export const listPropertiesMock = (): PropertyModel[] => {
  return Array.from({ length: 10 }, () => propertyModelMock())
}
