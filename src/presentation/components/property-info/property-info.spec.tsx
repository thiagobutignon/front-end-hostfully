import { render, screen } from '@testing-library/react'

import PropertyInfoComponent from '@/presentation/components/property-info/property-info'
import { PropertyModel } from '@/domain/models'
import { propertyModelMock } from '@/domain/mocks'

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

  it.skip('matches snapshot', () => {
    const { asFragment } = render(
      <PropertyInfoComponent selectedProperty={selectedProperty}>
        <div>children</div>
      </PropertyInfoComponent>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
