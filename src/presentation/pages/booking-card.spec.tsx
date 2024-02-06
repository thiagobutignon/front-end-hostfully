import { RenderResult, render } from '@testing-library/react'

import { Booking } from '@/domain/models'
import BookingCardComponent from '@/presentation/pages/booking-card'

describe('BookingCardComponent', () => {
  let sut: RenderResult
  const mockBooking: Booking.Model = {
    id: '1',
    totalPrice: 500,
    numberOfNights: 2,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-03'),
    hostEmail: 'host@example.com',
    guestEmail: 'guest@example.com',
    guests: {
      numberOfGuests: 2,
      guests: [{ name: 'John Doe', email: 'john@example.com' }]
    },
    property: {
      id: 'prop1',
      name: 'Seaside Escape',
      bedrooms: 1,
      beds: 1,
      cleaningFee: 1,
      description: 'description',
      image: ['image.jpg'],
      location: {
        city: 'city',
        country: 'country',
        number: '123',
        street: 'street'
      },
      maxGuests: 1,
      pricePerNight: 1,
      roomType: 'Apartment',
      serviceFee: 1,
      status: 'Cancelled'
    }
  }

  const onDelete = jest.fn()
  const onUpdate = jest.fn()
  beforeEach(() => {
    sut = render(
      <BookingCardComponent
        booking={mockBooking}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    )
  })
  it('renders without crashing', () => {
    const { getByText } = sut
    expect(getByText(`Booking ID: ${mockBooking.id}`)).toBeInTheDocument()
  })

  it('displays correct booking information', () => {
    const { getByText } = sut

    expect(
      getByText(`Property: ${mockBooking.property.name}`)
    ).toBeInTheDocument()
    expect(getByText(`Email: ${mockBooking.guestEmail}`)).toBeInTheDocument()
    expect(getByText('Start Date: Dec 31, 2023')).toBeInTheDocument()
    expect(getByText('End Date: Jan 2, 2024')).toBeInTheDocument()
    expect(
      getByText(`Number of Guests: ${mockBooking.guests.numberOfGuests}`)
    ).toBeInTheDocument()
    expect(
      getByText(`Number of Nights: ${mockBooking.numberOfNights}`)
    ).toBeInTheDocument()
    expect(
      getByText(`Total price: ${mockBooking.totalPrice}`)
    ).toBeInTheDocument()
  })

  test('matches snapshot', () => {
    const { asFragment } = sut

    expect(asFragment()).toMatchSnapshot()
  })
})
