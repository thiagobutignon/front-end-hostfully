import { render, screen } from '@testing-library/react'

import { propertyModelMock } from '@/domain/mocks'
import { PropertyModel } from '@/domain/models'
import PropertyInfoComponent from '@/presentation/components/property-info/property-info'

describe('PropertyInfoComponent', () => {
  let selectedProperty: PropertyModel
  beforeEach(() => {
    selectedProperty = propertyModelMock()
  })
  it('should display property details correctly', () => {
    render(
      <PropertyInfoComponent selectedProperty={selectedProperty}>
        <div>children</div>
      </PropertyInfoComponent>
    )

    expect(screen.getByText(selectedProperty.name)).toBeInTheDocument()
    expect(
      screen.getByText(
        `Guests: ${selectedProperty.maxGuests} | Bedrooms: ${selectedProperty.bedrooms} | Beds: ${selectedProperty.beds}`
      )
    ).toBeInTheDocument()
    expect(screen.getByText(selectedProperty.description)).toBeInTheDocument()
    expect(
      screen.getByText(`$${selectedProperty.pricePerNight}/night`)
    ).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { asFragment } = render(
      <PropertyInfoComponent
        selectedProperty={{
          bedrooms: 1,
          beds: 1,
          cleaningFee: 1,
          description: 'any_description',
          id: 'any_id',
          location: {
            city: 'any_city',
            country: 'any_country',
            number: '1',
            street: 'any_street'
          },
          maxGuests: 1,
          name: 'any_name',
          pricePerNight: 1,
          roomType: 'Apartment',
          image: ['any_url'],
          serviceFee: 1,
          status: 'Completed'
        }}
      >
        <div>children</div>
      </PropertyInfoComponent>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
